"use client"

import usePolling from "@/hooks/usePolling";
import Itinerary from "./Itinerary";
import TripBuilder from "./TripBuilderPages";
import { Trip } from "@/db/schema";
import { useState, useRef, useEffect } from "react"; // Import useRef
import { getTripById, TripWithDetails } from "@/actions/tripActions";

interface TripProps {
    tripId: number;
}


export default function TripComponent({ tripId }: TripProps) {
    const [trip, setTrip] = useState<TripWithDetails | null>(null);

    useEffect(() => {
        let intervalId: NodeJS.Timeout|undefined;

        const pollStatus = async () => {
            try {
                const dbTrip = await getTripById(tripId);

                console.log(dbTrip?.status);

                if (dbTrip?.status === 'GENERATED') {
                    clearInterval(intervalId);
                    setTrip(dbTrip);
                }
            } catch(error) {
                console.error("Error polling status:", error);
                clearInterval(intervalId);
            }
        }

        intervalId = setInterval(pollStatus, 3000);

        return () => {
            clearInterval(intervalId);
        }

    }, [tripId]);



    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <>
                <Itinerary trip={trip} />
                <TripBuilder trip={trip}/>
            </>
        </div>
    );
}
