"use client"

import { Calendar, Camera, Heart, MessageCircle, Share2, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import Image from "next/image"
import { Button } from "../ui/button";


export default function Content() {
    return(
        <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <Badge className="bg-amber-100 text-amber-700 mb-4">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Community Favorites
                    </Badge>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Trending AI-Generated Itineraries</h3>
                    <p className="text-gray-600 text-lg">Discover and share amazing travel plans created by our community</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "7-Day Japan Adventure",
                            author: "Sarah M.",
                            likes: 234,
                            image: "/images/japan.jpg",
                            tags: ["Culture", "Food", "AI-Optimized"],
                            duration: "7 days",
                            budget: "$1,200",
                        },
                        {
                            title: "European Romance Route",
                            author: "Mike & Lisa",
                            likes: 189,
                            image: "/images/europe.jpg",
                            tags: ["Romance", "History", "Collaborative"],
                            duration: "10 days",
                            budget: "$2,100",
                        },
                        {
                            title: "Southeast Asia Backpacking",
                            author: "Travel Squad",
                            likes: 156,
                            image: "/images/thailand.jpeg",
                            tags: ["Adventure", "Budget", "Group Trip"],
                            duration: "14 days",
                            budget: "$800",
                        },
                    ].map((itinerary, index) => (
                            <Card
                                key={index}
                                className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 bg-white pt-0"
                            >
                                <div className="relative w-full h-48">
                                    <Image
                                        src={itinerary.image}
                                        alt={itinerary.title}
                                        fill
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-white/90 text-gray-700">
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            AI-Generated
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4 flex space-x-2">
                                        <Button size="sm" variant="secondary" className="rounded-full p-2 bg-white/80 hover:bg-white">
                                            <Heart className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="secondary" className="rounded-full p-2 bg-white/80 hover:bg-white">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-coral-600 transition-colors">
                                            {itinerary.title}
                                        </h4>
                                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                                            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                                            <span>{itinerary.likes}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">by {itinerary.author}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {itinerary.tags.map((tag, tagIndex) => (
                                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                                        <span className="flex items-center">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {itinerary.duration}
                                        </span>
                                        <span className="font-semibold text-coral-600">{itinerary.budget}</span>
                                    </div>
                                    <Button className="w-full bg-amber-200 text-amber-700 hover:from-coral-700 hover:to-amber-700">
                                        <Camera className="h-4 w-4 mr-2" />
                                        View Itinerary
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                </div>
            </div>
        </section>
    );
}
