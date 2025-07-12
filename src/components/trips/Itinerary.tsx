"use client"

import { Calendar, Clock, Edit3, Heart, MapPin, Plus, Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import Image from "next/image"
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { TripWithDetails } from "@/actions/tripActions";


interface ItineraryProps{
    trip: TripWithDetails|null
}

export default function Itinerary({trip}: ItineraryProps){

    const [selectedDates, setSelectedDates] = useState(["Feb 10"]);
    const [] = useState(); 

    console.log(trip)


    return (
        <div>
            <Card className="overflow-hidden border-0 shadow-xl bg-white pt-0">
               {trip ? (
                <> 
                    <div className="relative h-72">
                    <Image
                        src={'/images/europe.jpg'}
                        alt={'travel'}
                        fill
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>
                    <div className="absolute bottom-6 left-6 text-white">
                        <h1 className="text-4xl font-bold mb-2">{ trip?.city }</h1>
                        <div className="flex items-center gap-2 text-lg opacity-90">
                            <MapPin className="w-5 h-5"/>
                            { trip?.country }
                        </div>
                    </div>
                    <div className="absolute top-6 right-6 flex gap-3">
                        <Button size="sm" className="bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30">
                            <Heart className="w-4 h-4"/>
                        </Button>
                        <Button size="sm" className="bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30">
                            All Photos
                        </Button>
                    </div>
                </div>

                <CardContent className="p-6">
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-3 text-gray-800">Overview</h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            { trip?.city } is a captivating destination in { trip?.country }, renowned for its vibrant culture and stunning landmarks. With a rich tapestry of historical charm and a dynamic atmosphere, it offers visitors a delightful blend of exploration, relaxation, and unique experiences.
                        </p>
                        <div className="flex gap-2 flex-wrap">
                            {trip.itineraries.map((itinerary) => {

                                        const date = new Date(itinerary.date);
                                        const formattedDate = date.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })

                                return (
                                            <Button
                                                key={formattedDate}
                                                size="sm"
                                                variant={selectedDates.includes(formattedDate) ? "default" : "outline"}
                                                onClick={() => {
                                                    if (selectedDates.includes(formattedDate)) {
                                                        setSelectedDates(selectedDates.filter((d) => d !== formattedDate))
                                                    } else {
                                                        setSelectedDates([...selectedDates, formattedDate]);
                                                    }
                                                }}
                                                className={
                                                    `cursor-pointer ${selectedDates.includes(formattedDate)
? "bg-yellow-200 hover:bg-amber-400 text-amber-800"
: "border-gray-300 hover:bg-gray-50"
}`
                                                }
                                            >
                                                {formattedDate} 
                                            </Button>
                                )
                                    })}
                        </div>
                    </div>

                    <div className="border-t border-gray-200 my-6"></div>

                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-amber-200"/>
                                Your Itinerary
                            </h3>
                            <Button size="sm" className="bg-amber-200 text-amber-800 hover:bg-yellow-400">
                                <Edit3 className="w-4 h-4 mr-2"/>
                                Edit Plan
                            </Button>
                        </div>

                        <div className="space-y-20">
                            {trip.itineraries.map((itinerary) => {
                                        const date = new Date(itinerary.date);
                                        const formattedDate = date.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })
                                        return (
                                            <div className="space-y-4" key={itinerary.id}>     
                                                <h2 className="text-xl font-semibold">{formattedDate}</h2>
                                                {
                                                    itinerary.details.map((detail, detailIndex) => (
                                                        <div
                                                            key={detail.id}
                                                            className="group relative overflow-hidden roundedx-xl bg-gray-50 p-5 hover:shadow-lg transition-all duration-300 border border-gray-200"
                                                        >
                                                            <div className="flex items-center justify-center gap-4">
                                                                <div className="flex flex-col items-center justify-center flex-shrink-0">
                                                                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center text-amber-800 font-bold text-sm mb-2">
                                                                        {detailIndex + 1}
                                                                    </div>
                                                                </div>
                                                                <div className="w-20 h-20 rounded-xl overflow-hidden">
                                                                    {/* TODO: ADD IMAGE TO ITINERARY DETAILS */}
                                                                    <img
                                                                        src={"/placeholder.svg"}
                                                                        alt={detail.place}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <h4 className="font-bold text-lg text-gray-800">{detail.place}</h4>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="ghost"
                                                                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                        >
                                                                            <Edit3 className="w-4 h-4"/>
                                                                        </Button>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <div className="flex items-center gap-1">
                                                                            <Star className="w-4 h-4 fill-amber-400 text-amber-400"/>
                                                                            {/* TODO: ADD IMAGE TO ITINERARY DETAILS */}
                                                                            <span className="font-semibold">4.3</span>
                                                                        </div>
                                                                        <span className="text-sm text-gray-500">(8.6k reviews)</span>
                                                                        {detail.time && (
                                                                            <>
                                                                                <span className="text-gray-400">•</span>
                                                                                <Badge className="bg-amber-200 text-amber-800 hover:bg-amber-400 flex items-center gap-1">
                                                                                    <Clock className="w-3 h-3"/>
                                                                                    {detail.time}
                                                                                </Badge>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-sm text-gray-600 line-clamp-2">{detail.description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ) 

                            })}

                            <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-amber-200 hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-2 transition-colors">
                                        <Plus className="w-6 h-6 text-gray-600 group-hover:text-gray-800"/>
                                    </div>
                                    <p className="text-gray-600 font-medium">Add more to your itinerary</p>
                                    <p className="text-sm text-gray-500">Use the suggestions on the right →</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                </>
               ) : (
                <>
                  <div className="p-10">
                    <h1 className="text-2xl font-bold">We are generating your adventure...</h1>
                    <p>This may take few seconds</p>
                  </div>
                  <Skeleton className="rounded-xl h-72"/>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-full"/>
                  </div>
                </>
               )} 
            </Card>
        </div>
    );
}
