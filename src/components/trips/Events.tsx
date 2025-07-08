import { Calendar, Clock, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: string
  image: string
}

export default function Events(){
    const events: Event[] = [
        {
            id: "1",
            title: "Flamenco Show",
            date: "Feb 10",
            time: "8:00 PM",
            location: "Palau de la Música",
            type: "Music",
            image: "/placeholder.svg?height=150&width=200",
        },
        {
            id: "2",
            title: "Tapas Food Tour",
            date: "Feb 11",
            time: "6:00 PM",
            location: "Gothic Quarter",
            type: "Food",
            image: "/placeholder.svg?height=150&width=200",
        },
        {
            id: "3",
            title: "Sunset at Bunkers",
            date: "Feb 12",
            time: "7:30 PM",
            location: "Bunkers del Carmel",
            type: "Experience",
            image: "/placeholder.svg?height=150&width=200",
        },
    ]
    return (
        <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Local Events</h3>
            <p className="text-gray-600 mb-6 text-sm">
                Add these local events and experiences to your itinerary
            </p>
            <div className="space-y-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="group flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all duration-300"
                    >
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                            <img
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 mb-1">{event.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {event.date}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {event.time}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">{event.location}</p>
                        </div>
                        <Button className="cursor-pointer bg-amber-200 hover:bg-amber-400 text-amber-800 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Itinerary
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
