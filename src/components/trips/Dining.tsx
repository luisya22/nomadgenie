import { Plus, Star } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";


export default function Dining(){

    const suggestedDining = [
        {
            name: "Cal Pep",
            type: "Tapas Bar",
            rating: 4.6,
            price: "€€€",
            image: "/placeholder.svg?height=120&width=200",
            location: "El Born",
        },
        {
            name: "Disfrutar",
            type: "Fine Dining",
            rating: 4.9,
            price: "€€€€",
            image: "/placeholder.svg?height=120&width=200",
            location: "Eixample",
        },
        {
            name: "Bar Mut",
            type: "Wine Bar",
            rating: 4.5,
            price: "€€",
            image: "/placeholder.svg?height=120&width=200",
            location: "Eixample",
        },
        {
            name: "La Paradeta",
            type: "Seafood",
            rating: 4.4,
            price: "€€",
            image: "/placeholder.svg?height=120&width=200",
            location: "Multiple Locations",
        },
    ];

    return (
        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Recommended Dining</h3>
            <p className="text-gray-600 mb-6 text-sm">
                Add these restaurants and food experiences to your itinerary
            </p>
            <div className="grid grid-cols-1 gap-4">
                {suggestedDining.map((restaurant, index) => (
                    <div
                        key={index}
                        className="group overflow-hidden rounded-xl border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300"
                    >
                        <div className="flex gap-4 p-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                    src={restaurant.image || "/placeholder.svg"}
                                    alt={restaurant.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-gray-800">{restaurant.name}</h4>
                                    <Badge className="bg-gray-100 text-gray-800">{restaurant.price}</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">{restaurant.type}</p>
                                <p className="text-xs text-gray-500 mb-2">{restaurant.location}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="font-semibold text-sm">{restaurant.rating}</span>
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
