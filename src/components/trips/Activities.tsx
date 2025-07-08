import { Plus, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Activities(){
    const suggestedActivities = [
        {
            name: "Casa Batlló",
            type: "Architecture",
            rating: 4.5,
            duration: "1.5 hours",
            image: "/placeholder.svg?height=120&width=200",
            price: "€29",
        },
        {
            name: "Gothic Quarter Walk",
            type: "Walking Tour",
            rating: 4.7,
            duration: "3 hours",
            image: "/placeholder.svg?height=120&width=200",
            price: "Free",
        },
        {
            name: "Barceloneta Beach",
            type: "Beach & Relaxation",
            rating: 4.3,
            duration: "Half day",
            image: "/placeholder.svg?height=120&width=200",
            price: "Free",
        },
        {
            name: "La Boqueria Market",
            type: "Food Market",
            rating: 4.4,
            duration: "2 hours",
            image: "/placeholder.svg?height=120&width=200",
            price: "Free",
        },
    ];

    return (
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Things to Do</h3>
            <p className="text-gray-600 mb-6 text-sm">
                Discover activities and attractions to add to your Barcelona itinerary
            </p>
            <div className="grid grid-cols-1 gap-4">
                {suggestedActivities.map((activity, index) => (
                    <div
                        key={index}
                        className="group overflow-hidden rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300"
                    >
                        <div className="flex gap-4 p-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={activity.image || "/placeholder.svg"}
                                    alt={activity.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-gray-800">{activity.name}</h4>
                                    <Badge className="bg-green-100 text-green-800">{activity.price}</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{activity.type}</p>
                                <p className="text-xs text-gray-500 mb-2">Duration: {activity.duration}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-sm">{activity.rating}</span>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="bg-[#ffd230] hover:bg-yellow-400 text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <Plus className="w-3 h-3 mr-1" />
                                        Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div> 
    );
}
