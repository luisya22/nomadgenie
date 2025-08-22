"use client"

import { Plus, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { useState } from "react";
import { TripWithDetails } from "@/actions/tripActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMessage, getTripMessages } from "@/actions/chatActions";
import { TripChatMessage } from "@/db/schema";

interface ChatProps {
    trip: TripWithDetails|null
}

export default function Chat({trip}: ChatProps){

    const [message, setMessage] = useState("")
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["tripMessages", trip?.id],
        queryFn: () => getTripMessages(trip?.id),
        enabled: !!trip?.id,
    });

    const sendMessage = useMutation({
        mutationFn: async (formData: FormData) => {
            console.log("Hello there!");
            return addMessage(formData);
        },
        onSuccess: (result) => {
            if (result.data) {
                queryClient.invalidateQueries({ queryKey: ["tripMessages", trip?.id] });
            } else if (result.errors) {
                // TODO: Handle errors
                console.error(result.errors);
            }
        },
        onError: () => {
            // TODO Handle errors
        }
    });

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trip?.id) return;
        if (!message.trim()) return;

        const formData = new FormData();
        formData.set("message", message);
        formData.set("tripId", String(trip.id));

        sendMessage.mutate(formData, {
            onSuccess: (result) => {
                if (result.data) setMessage("");
            }
        })
    }

    return (
        <div className="p-6 flex flex-col">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">What do you have in mind?</h2>
                <p className="text-gray-600">
                    {`I'm here to help you build the perfect ${trip?.city} itinerary. Ask me anything!`}
                </p>
            </div>
            <ScrollArea className="flex-1 mb-6">
                <div className="space-y-4 pr-4">
                    <div className="flex gap-3">
                        <Avatar>
                            <AvatarFallback className="bg-amber-200 text-amber-800 font-bold">NG</AvatarFallback>
                        </Avatar>
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                            <p className="text-gray-800">
                                {`¡Hola! I'm your ${trip?.city} travel genie. I can help you discover hidden gems, plan your
itinerary, find amazing restaurants, and create unforgettable experiences. What would you
like to add to your trip?`}
                            </p>
                        </div>
                    </div>
                    { data?.map(message => {
                        if(message.role == 'user') return <UserMessage message={message} key={message.id}/>

                        return <AssitantMessage message={message} key={message.id}/>
                    })}
                </div>
            </ScrollArea>
            <form onSubmit={handleSend}>
                <div className="flex gap-3">
                    <Input
                        placeholder="Ask me to suggest something for your itinerary..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 border-gray-300 focus:border-blue-500 rounded-xl"
                    />
                    <Button className="bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-xl px-6" disabled={sendMessage.isPending} type="submit">
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </form>
        </div>
    )
}

interface UserMessageProps {
    message: TripChatMessage
}

function UserMessage({message}: UserMessageProps){
    return (
        <div className="flex gap-3 justify-end">
            <div className="bg-gray-800 text-white rounded-2xl rounded-tr-sm p-4 max-w-[80%] shadow-md">
                <p>
                    {message.content}
                </p>
            </div>
            <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gray-300 text-gray-700">You</AvatarFallback>
            </Avatar>
        </div>

    );
}

interface AssitanteMessageProps {
    message: TripChatMessage
}

function AssitantMessage({message}: AssitanteMessageProps) {
    return (
        <div className="flex gap-3">
            <Avatar>
                <AvatarFallback className="bg-amber-200 text-amber-800 font-bold">NG</AvatarFallback>
            </Avatar>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                <p className="text-gray-800 mb-3">
                    {message.content}
                </p>
                {message.options && message.options?.length > 0 ? 
                    (
                        <div className="space-y-2">
                            {message.options.map((option, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            className="bg-amber-200 hover:bg-amber-300 text-amber-800 h-6 px-2 text-xs"
                                        >
                                            <Plus className="w-3 h-3 mr-1" />
                                            Add
                                        </Button>
                                        <span className="text-sm text-gray-700">{option.name}</span>
                                    </div>
                                ))}
                        </div>
                    ): ''
                }
            </div>
        </div>
    );
}
