"use server"

import { TripChatMessage, tripChatMessages, trips } from "@/db/schema";
import { db } from "../db/drizzle";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { chatFormSchema } from "@/lib/validations/chat";

interface ActionState<T> {
    message: string;
    data?: T;
    errors?: Record<string, string[]>;
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

    console.log("1");

    if(!userId) {
        return { message: 'Authentication required. Please log in to edit your trip'}
    }

    console.log("2");

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

    try {

        const trip = await db.query.trips.findFirst({
            where: eq(trips.id, tripId)
        });

        if (trip?.userId != userId) {
            return { message: 'Forbidden', errors: {'general': ["Forbidden"]}}
        }

        const [newMessage] = await db.insert(tripChatMessages).values({
            tripId: tripId, 
            role: "user",
            content: message,
        }).returning({ 
                id: tripChatMessages.id,
                content: tripChatMessages.content,
                role: tripChatMessages.role,
                status: tripChatMessages.status,
                tripId: tripChatMessages.tripId
        });

        if (!newMessage || !newMessage.id) {
            throw new Error("Failed to create message");
        }

        return { message: "Message sent successfully", data: newMessage}
    } catch (error) {
        console.error("Database error adding message:", error);

        return { message: "Failed to add message due to server error.", errors: {'general': ["Server Error"]}};
    }
}


