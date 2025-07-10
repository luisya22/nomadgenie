import { getTripById } from "@/actions/tripActions";
import Itinerary from "@/components/trips/Itinerary";
import TripBuilder from "@/components/trips/TripBuilderPages";


export default async function AppPage({params}: {params: {tripId: string}}) {
    // TODO: Load trip data by tripId on the params
    // TODO: on addTrip action send SQS
    // TODO: Processing screen until trip is Ready
    // TODO: Make GPT Generate a trip

    const tripId = parseInt(params?.tripId, 10);
    const trip = await getTripById(tripId)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <Itinerary trip={trip}/> 
            <TripBuilder/>
        </div>
    );
}
