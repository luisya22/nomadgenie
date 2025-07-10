import TripForm from "@/components/TripForm/TripForm";
export default function TravelPlanner(){
    return (
        <div className="mx-40 pt-10">
            <div className="mb-12 mt-10">
                <h1 className="text-4xl font-bold text-gray-900 b-4">Tell us your more about your dreamed travel</h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
                </p>
            </div>
            <TripForm/>        
        </div>
    );
}
