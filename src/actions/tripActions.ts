"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db/drizzle";
import { type Trip, trips } from "../db/schema";
import { revalidatePath } from "next/cache";
import { tripFormSchema } from "@/lib/validations/trip";

interface ActionState {
    message: string;
    errors?: {
        [key: string]: string[];
    }
}

export async function getTrips() {
    const data: Trip[] = await db.select().from(trips);
    return data;
}

export async function addTrip(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const {userId} = await auth();

    console.log("Bro");
    
    if(!userId) {
        return { message: 'Authentication required. Please log in to add trip.'};
    }

    const rawData = {
        fromDate: formData.get('fromDate'),
        toDate: formData.get('toDate')
    };

    const validationResult = tripFormSchema.safeParse(rawData);

    if(!validationResult.success) {
        const errors: {[key: string]: string[]} = {};
        validationResult.error.errors.forEach(err => {
            if (err.path && err.path.length > 0) {
                const field = err.path[0].toString();
                if (!errors[field]){
                    errors[field] = [];
                }
                errors[field].push(err.message);
            }
        });

        return { message: 'Validation failed.', errors };
    }

    const { fromDate, toDate } = validationResult.data;

    try {
        await db.insert(trips).values({
            userId: userId,
            fromDate: fromDate,
            toDate: toDate
        });

        revalidatePath('/app');

        return { message: 'Trip added successfully!' };
    } catch (error) {
        console.error("Database error adding trip:", error);

        return { message: "Failed to add trip due to server error.", errors: {'general': ["Server Error"]} };
    } 
}



