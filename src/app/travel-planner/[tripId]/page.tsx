import TripComponent from "@/components/trips/Trip";



export default async function AppPage({params}: {params: Promise<{tripId: string}>}) {
    // TODO: Load trip data by tripId on the params
    // TODO: Processing screen until trip is Ready
    // TODO: Make GPT Generate a trip
    // const params = useParams<{tripId: string}>();
    const {tripId} = await params;


    return (
        <TripComponent tripId={parseInt(tripId)}/>
    );
}
