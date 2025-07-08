"use client"

import Itinerary from "@/components/trips/Itinerary";
import TripBuilder from "@/components/trips/TripBuilderPages";


export default function AppPage() {
    // TODO
    // Form to get user info about travel
    // App page (DONE)
    // Community Page (likes, comments)
    // My Travels Page
    // Split cards on they own and put tab state on children
    
    
        
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <Itinerary/> 
            <TripBuilder/>
        </div>
    );
}
