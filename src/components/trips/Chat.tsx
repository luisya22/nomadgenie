import { Plus, Send } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { useState } from "react";

export default function Chat(){

    const [chatMessage, setChatMessage] = useState("")

    return (
        <div className="p-6 flex flex-col">
            <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">What do you have in mind?</h2>
                <p className="text-gray-600">
                    {`I'm here to help you build the perfect Barcelona itinerary. Ask me anything!`}
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
                                {`¡Hola! I'm your Barcelona travel genie. I can help you discover hidden gems, plan your
itinerary, find amazing restaurants, and create unforgettable experiences. What would you
like to add to your trip?`}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <div className="bg-gray-800 text-white rounded-2xl rounded-tr-sm p-4 max-w-[80%] shadow-md">
                            <p>
                                I want to experience authentic Barcelona like a local. What should I add to my itinerary?
                            </p>
                        </div>
                        <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gray-300 text-gray-700">You</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex gap-3">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-amber-200 text-amber-800 font-bold">NG</AvatarFallback>
                        </Avatar>
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
                            <p className="text-gray-800 mb-3">
                                {`Perfect! Here are some authentic experiences I'd recommend adding:`}
                            </p>
                            <div className="space-y-2">
                                {[
                                    "Morning coffee at a local café in Gràcia",
                                    "Vermouth hour at Bar Mut (11am-1pm)",
                                    "Sunset at Bunkers del Carmel",
                                    "Evening tapas crawl in El Born",
                                ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Button
                                                size="sm"
                                                className="bg-amber-200 hover:bg-amber-300 text-amber-800 h-6 px-2 text-xs"
                                            >
                                                <Plus className="w-3 h-3 mr-1" />
                                                Add
                                            </Button>
                                            <span className="text-sm text-gray-700">{item}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <div className="flex gap-3">
                <Input
                    placeholder="Ask me to suggest something for your itinerary..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 border-gray-300 focus:border-blue-500 rounded-xl"
                />
                <Button className="bg-amber-200 hover:bg-amber-300 text-amber-800 rounded-xl px-6">
                    <Send className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
