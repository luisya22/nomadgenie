import { Play, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Video {
  id: string
  title: string
  channel: string
  thumbnail: string
  duration: string
  views: string
}

export default function Videos(){
    const videos: Video[] = [
    {
      id: "1",
      title: "Barcelona in 4K - Complete City Tour",
      channel: "Travel With Me",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "15:42",
      views: "2.1M",
    },
    {
      id: "2",
      title: "Best Tapas Bars in Barcelona",
      channel: "Food Explorer",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "12:35",
      views: "856K",
    },
    {
      id: "3",
      title: "Hidden Gems of Barcelona",
      channel: "Local Wanderer",
      thumbnail: "/placeholder.svg?height=200&width=300",
      duration: "11:28",
      views: "1.1M",
    },
  ];

    return (
        <div className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Get Inspired</h3>
            <p className="text-gray-600 mb-6 text-sm">
                Watch these videos to discover places you might want to add to your itinerary
            </p>
            <div className="space-y-4">
                {videos.map((video) => (
                    <div
                        key={video.id}
                        className="group cursor-pointer flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                            <img
                                src={video.thumbnail || "/placeholder.svg"}
                                alt={video.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <Play className="w-6 h-6 text-white" />
                            </div>
                            <Badge className="absolute bottom-1 right-1 bg-black/80 text-white text-xs">
                                {video.duration}
                            </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                {video.title}
                            </h4>
                            <p className="text-gray-600 text-xs mb-2">{video.channel}</p>
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 text-xs">{video.views} views</p>
                                <Button
                                    size="sm"
                                    className="bg-amber-200 hover:bg-amber-400 text-amber-800 h-7 px-3 text-xs"
                                >
                                    <Plus className="w-3 h-3 mr-1" />
                                    Inspire Me
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}
