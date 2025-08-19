"use client"

import Itinerary from "./Itinerary";
import TripBuilder from "./TripBuilderPages";
import { getTripById, TripWithDetails } from "@/actions/tripActions";
import { useQuery } from '@tanstack/react-query';

interface TripProps {
    tripId: number;
}

function TripLoading(){
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
            <div className="w-20 h-20 border-8 border-gray-200 border-t-amber-200 rounded-full animate-spin mb-6" />
            <h1 className="text-2xl font-semibold mb-2 text-center">
                We are generating your Trip
            </h1>
            <p className="text-gray-500 text-center">
                This may take a few seconds. Please wait...
            </p>
        </div>
    );
}


export default function TripComponent({ tripId }: TripProps) {

    const { status, data, error } = useQuery<TripWithDetails, Error>({
        queryKey: ['trip', tripId],
        queryFn: () => getTripById(tripId),
        enabled: !!tripId,
        refetchInterval: (query) => (query?.state?.data?.status === 'GENERATED' ? false: 3000),
        refetchIntervalInBackground: true
    });


    if (status === 'pending') return TripLoading();
    if (status === 'error') return <p>Error: {(error as Error).message}</p>

    return (
        <>
            {data?.status === 'GENERATED' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                    <>
                        <Itinerary trip={data} />
                        <TripBuilder trip={data}/>
                    </>
                </div>
            ) : <TripLoading/>
            }
        </>
    );
}
