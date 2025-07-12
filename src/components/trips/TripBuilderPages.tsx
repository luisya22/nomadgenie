"use client"

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Play, Calendar, Utensils, Camera } from "lucide-react";
import { useState } from "react";
import Chat from "./Chat";
import Videos from "./Videos";
import Events from "./Events";
import Dining from "./Dining";
import Activities from "./Activities";
import { Trip } from "@/db/schema";
import { Skeleton } from "../ui/skeleton";
import { TripWithDetails } from "@/actions/tripActions";

interface TripBuilderProps{
    trip: TripWithDetails|null
}

export default function TripBuilder({trip}: TripBuilderProps){

    const [activeTab, setActiveTab] = useState("chat");
    

    return (
        <div>
            <Card className="border-0 shadow-xl bg-white pt-0">
               {trip ? (
                    <>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-5 gb-gray-100 p-1 rounded-none">
                                <TabsTrigger 
                                    value="chat"
                                    className="data-[state=active]:bg-white dasta-[state=active]:shadow-md rounded-lg"
                                >
                                    <MessageCircle className="w-4 h-4 mr-2"/>
                                    AI Chat
                                </TabsTrigger>
                                <TabsTrigger
                                    value="videos"
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg"
                                >
                                    <Play className="w-4 h-4 mr-2"/>
                                    Videos
                                </TabsTrigger>
                                <TabsTrigger
                                    value="events"
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg"
                                >
                                    <Calendar className="w-4 h-4 mr-2"/>
                                    Events
                                </TabsTrigger>
                                <TabsTrigger
                                    value="dining"
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg"
                                >
                                    <Utensils className="w-4 h-4 mr-2"/>
                                    Dinings
                                </TabsTrigger>
                                <TabsTrigger
                                    value="activities"
                                    className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-lg"
                                >
                                    <Camera className="w-4 h-4 mr-2"/>
                                    Activities
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="chat">
                                <Chat/> 
                            </TabsContent>
                            <TabsContent value="videos" className="mt-6">
                                <Videos/>
                            </TabsContent>
                            <TabsContent value="events" className="mt-6">
                                <Events/>
                            </TabsContent>
                            <TabsContent value="dining" className="mt-6">
                                <Dining/>
                            </TabsContent>
                            <TabsContent value="activities" className="mt-6">
                                <Activities/>
                            </TabsContent>
                        </Tabs>
                    </>
                ) : (
                        <>
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
