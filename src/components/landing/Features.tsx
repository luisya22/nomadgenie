"use client"

import { Brain, Heart, MessageCircle, Sparkles } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"

export default function Features() {

    return (
        <section className="py-16 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <Badge className="bg-amber-100 text-amber-700 mb-4">
                    <Sparkles className="h-4 w-4 mr-2"/>
                    AI-Powered Features
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">How Nomad Genie works?</h3>
                <p className="text-gray-600 text-lg">Experience the future of travel planning</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                    {
                        icon: <Brain className="h-8 w-8 text-rose-600" />,
                        title: "AI Trip Planning",
                        description: "Tell us your preferences and let our AI create the perfect personalized itinerary",
                        background: "bg-rose-100",
                    },
                    {
                        icon: <MessageCircle className="h-8 w-8 text-teal-600" />,
                        title: "Community Sharing",
                        description: "Share your trips, get feedback, and discover amazing places from fellow travelers",
                        background: "bg-teal-100",
                    },
                    {
                        icon: <Heart className="h-8 w-8 text-amber-600" />,
                        title: "Collaborative Planning",
                        description: "Plan trips together with friends and family in real-time collaboration",
                        background: "bg-amber-100",
                    },
                ].map((feature, index) => (
                        <Card
                            key={index}
                            className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white"
                        >
                            <CardContent className="p-8 text-center">
                                <div
                                    className={`inline-flex p-4 rounded-2xl ${feature.background} mb-6 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
            </div> 
        </section>
    )
}
