"use client"

import { getTripById } from "@/actions/tripActions";
import Itinerary from "@/components/trips/Itinerary";
import TripBuilder from "@/components/trips/TripBuilderPages";
import { Trip } from "@/db/schema";
import { useParams } from "next/navigation";
import {useEffect, useState } from "react";

export default function AppPage() {
    // TODO: Load trip data by tripId on the params
    // TODO: on addTrip action send SQS
    // TODO: Processing screen until trip is Ready
    // TODO: Make GPT Generate a trip
    const params = useParams<{tripId: string}>();

    const [trip, setTrip] = useState<Trip>();
    //TODO: Remove useEffect later
    useEffect( () => {
        const id = params?.tripId;
        if(id){
            const tripId = parseInt(id);
            getTripById(tripId).then(t => {
                setTrip(t)
            });
        }
    }, [params])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            {trip ? (
                <>
                    <Itinerary trip={trip}/> 
                    <TripBuilder/>
                </>
            ): ''}
        </div>
    );
}
