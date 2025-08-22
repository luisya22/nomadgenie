"use server"

import { itineraries, itineraryDetails, TripChatMessage, tripChatMessages, trips } from "@/db/schema";
import { db } from "../db/drizzle";
import { desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { chatFormSchema } from "@/lib/validations/chat";
import { openai } from '@ai-sdk/openai';
import { generateObject, ModelMessage } from 'ai';
import { z } from 'zod';
import { TRIP_OPTIONS_PROMPT } from "@/lib/prompts/prompts";

interface ActionState<T> {
    message: string;
    data?: T;
    errors?: Record<string, string[]>;
}

// TODO: Use a single place to define this interface
interface Option {
    type: string,
    name: string,
    place: string,
    description: string
}

export type ChatActionState = ActionState<TripChatMessage>;

export async function getTripMessages(tripId: number|undefined) {
    if(!tripId) {
        return [];
    }


    const messages = await db.query.tripChatMessages.findMany({
        where: eq(tripChatMessages.tripId, tripId)
    });
    
    return messages;
}

export async function addMessage(formData: FormData): Promise<ChatActionState> {
    const {userId} = await auth();

    if(!userId) {
        return { message: 'Authentication required. Please log in to edit your trip'}
    }

    const rawData = {
        message: formData.get('message'),
        tripId: Number(formData.get('tripId'))
    };

    const validationResult = chatFormSchema.safeParse(rawData);

    if(!validationResult.success){
        const errors: {[key: string]: string[]} = {};
        validationResult.error.errors.forEach(err => {
            if (err.path && err.path.length > 0){
                const field = err.path[0].toString();
                if (!errors[field]){
                    errors[field] = [];
                }
                errors[field].push(err.message);
            }
        });

        return { message: 'Validation failed.', errors}
    }

    const { tripId, message } = validationResult.data;

    // TODO: Maybe add a transaction
    try {

        const trip = await db.query.trips.findFirst({
            where: eq(trips.id, tripId)
        });

        if (trip?.userId != userId) {
            return { message: 'Forbidden', errors: {'general': ["Forbidden"]}}
        }

        const newMessage = await storeMessage(tripId, "user", message, []);

        if (!newMessage || !newMessage.id) {
            throw new Error("Failed to create message");
        }
        
        const { messages, model } = await setPromptData(tripId);

        
        const result = await generateObject({
            model: model,
            providerOptions: {
                openai: {
                    structuredOutputs: false,
                }
            },
            schemaName: 'message',
            system: TRIP_OPTIONS_PROMPT,
            schemaDescription: 'A trip options',
            schema: z.object({ 
                text: z.string(),
                options: z.array(
                    z.object({
                        type: z.string(),
                        name: z.string(),
                        place: z.string(),
                        description: z.string()
                    })
                )
            }),
            messages: messages
        })

        const newAssitantMessage = await storeMessage(tripId, "assistant", result.object.text, result.object.options);

        if(!newAssitantMessage || !newAssitantMessage.id){
            throw new Error("Failed persisting message");
        }

        return { message: "Message sent successfully", data: newMessage}
    } catch (error) {
        console.error("Database error adding message:", error);

        return { message: "Failed to add message due to server error.", errors: {'general': ["Server Error"]}};
    }
}

async function storeMessage(tripId: number, role: string, content: string, options: Option[]){
    const [newMessage] = await db.insert(tripChatMessages).values({
        tripId: tripId,
        role: role,
        content: content,
        options: options,
    }).returning({
            id: tripChatMessages.id,
            content: tripChatMessages.content,
            role: tripChatMessages.role,
            status: tripChatMessages.status,
            tripId: tripChatMessages.tripId,
            createdAt: tripChatMessages.createdAt,
            updatedAt: tripChatMessages.updatedAt,
            options: tripChatMessages.options
    });

    return newMessage;
}

async function setPromptData(tripId: number) {
    const dbMessages = await db.query.tripChatMessages.findMany({
        where: eq(tripChatMessages.tripId, tripId),
        limit: 10,
        orderBy: [desc(tripChatMessages.id)]
    });

    const activities = await db
        .select()
        .from(itineraryDetails)
        .innerJoin(itineraries, eq(itineraryDetails.itineraryId, itineraries.id))
        .where(eq(itineraries.tripId, tripId));


    const messages: ModelMessage[] = dbMessages.reverse().map(m => ({
        role: m.role as "user" | "assistant", 
        content: [
            {
                type: 'text',
                text: m.content
            }
        ]
    }));

    messages.push({
        role: "assistant",
        content: [
            {
                type: "text",
                text: `The user already has these activities planned: ${JSON.stringify(activities, null, 2)}`
            }
        ]
    });

    
    const model = openai('gpt-4o-mini');

    return { messages, model };
}
