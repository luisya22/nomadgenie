"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "../db/drizzle";
import { type Trip, trips } from "../db/schema";
import { revalidatePath } from "next/cache";
import { tripFormSchema } from "@/lib/validations/trip";
import { redirect } from "next/navigation";
import { sendMessage } from "@/lib/sqs";
import { eq } from "drizzle-orm";

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

export async function getTripById(id: number) {
    const trip = await db.query.trips.findFirst({
        where: eq(trips.id, id),
        with: {
            itineraries: {
                with: {
                    details: true
                }
            }
        }
    });

    console.log("This is the trip", trip, typeof trip);

    return trip;
}

export type TripWithDetails = Awaited<ReturnType<typeof getTripById>>;

export async function addTrip(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const {userId} = await auth();
 
    if(!userId) {
        return { message: 'Authentication required. Please log in to add trip.'};
    }


    const rawData = {
        destination: formData.get('destination'),
        fromDate: formData.get('fromDate'),
        toDate: formData.get('toDate'),
        budget: formData.get('budget'), 
        activities: formData.getAll('activities'),
        travelGroup: formData.get('travelGroup')
    };

    console.log("Data", rawData)


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

    const { fromDate, toDate, destination, budget, activities } = validationResult.data;

    // TODO: Maybe better way to do it directly with zod?
    const destinationArr = destination.split(', ');
    const city = destinationArr[0].trim();
    const country = destinationArr[1].trim();
    let tripId: number|null = null;


    try {
        const [newTrip] = await db.insert(trips).values({
            userId: userId,
            country: country,
            city: city,
            fromDate: fromDate,
            toDate: toDate,
            budget: budget,
            selectedActivities: activities
        }).returning({ id: trips.id });

        if (!newTrip || !newTrip.id) {
            throw new Error('Failed to retrieve new trip ID after insertion.');
        }

        tripId = newTrip.id;

        await sendMessage({
            QueueUrl: process.env.AWS_TRIP_QUEUE_URL!,
            MessageBody: JSON.stringify({ tripId: tripId })
        })

        revalidatePath('/travel-planner');
        revalidatePath(`/travel-planner/${tripId}`);

    } catch (error) {
        console.error("Database error adding trip:", error);

        return { message: "Failed to add trip due to server error.", errors: {'general': ["Server Error"]} };
    } 

    redirect(`/travel-planner/${tripId}`);
}



