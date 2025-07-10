import { getTripById } from "@/actions/tripActions";
import Itinerary from "@/components/trips/Itinerary";
import TripBuilder from "@/components/trips/TripBuilderPages";

interface CustomPageProps {
    params: { [key: string]: string | string[] }; // This is the correct type for dynamic route params
    searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function AppPage(pageProps: CustomPageProps) {
    // TODO: Load trip data by tripId on the params
    // TODO: on addTrip action send SQS
    // TODO: Processing screen until trip is Ready
    // TODO: Make GPT Generate a trip
    const params = pageProps.params;
    const tripId = parseInt(params["tripId"] as string, 10);
    const trip = await getTripById(tripId)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
            <Itinerary trip={trip}/> 
            <TripBuilder/>
        </div>
    );
}
