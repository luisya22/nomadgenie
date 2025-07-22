"use client"

import { Zap, MessageCircle, Globe } from "lucide-react"
import { Badge } from "../ui/badge";

export default function Hero() {

    return (
        <section className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Your Personal
                    <span className="block text-amber-300">Travel Genie</span>
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    Create personalized itineraries with AI, share with the community, and discover hidden gems through collaborative travel planning
                </p>

                 
                <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-300">
                    <Badge className="bg-amber-100 text-amber-700 flex items-center space-x-2">
                        <Zap className="h-4 w-4" />
                        <span>Instant AI Planning</span>
                    </Badge>
                    <Badge className="bg-green-100 text-green-700 flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Community Insights</span>
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 flex items-center space-x-2">
                        <Globe className="h-4 w-4" />
                        <span>Global Destinations</span>
                    </Badge>
                </div>
            </div>
        </section>
    );
}
