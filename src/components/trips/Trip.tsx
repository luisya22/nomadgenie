"use client"

import Itinerary from "./Itinerary";
import TripBuilder from "./TripBuilderPages";
import { useState, useEffect } from "react"; // Import useRef
import { getTripById, TripWithDetails } from "@/actions/tripActions";

interface TripProps {
    tripId: number;
}


export default function TripComponent({ tripId }: TripProps) {
    const [trip, setTrip] = useState<TripWithDetails | null>(null);

    useEffect(() => {
        const pollStatus = async () => {
            try {
                
                const dbTrip = await getTripById(tripId);

                console.log(dbTrip?.status);

                if (dbTrip?.status === 'GENERATED') {
                    setTrip(dbTrip);
                    return;
                }

                setTimeout(pollStatus, 3000)
            } catch(error) {
                console.error("Error polling status:", error);
            }
        }

        pollStatus() 

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
