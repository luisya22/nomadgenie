"use client"

import Itinerary from "@/components/trips/Itinerary";
import TripBuilder from "@/components/trips/TripBuilderPages";


export default function AppPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <Itinerary/> 
            <TripBuilder/>
        </div>
    );
}
