"use client"

import { useState, useEffect } from "react"
import { Search, Menu, MapPin, Calendar, Users, Star, Heart, Share2, Sparkles, Brain, Zap, MessageCircle, Globe, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function TravelApp() {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 400)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navOpacity = Math.min(scrollY / 500, 1)
  const heroOpacity = Math.max(1 - scrollY / 500, 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
          style={{
            backgroundImage: `url('/images/main-landing.jpg?height=1080&width=1920')`,
            opacity: heroOpacity,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Navigation Bar */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "bg-white shadow-lg" : "bg-transparent"
          }`}
          style={{
            backgroundColor: isScrolled ? "white" : `rgba(255, 255, 255, ${navOpacity})`,
            boxShadow: isScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none"
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <h1
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    isScrolled ? "text-gray-900" : scrollY > 150 ? "text-gray-900" : "text-white"
                  }`}
                >
                  Nomad<span className="text-amber-300">Genie</span>
                </h1>
                <div className="hidden md:flex space-x-6">
                  {["AI Planner", "Community", "My Trips", "Explore"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className={`transition-colors duration-300 hover:text-blue-600 ${
                        isScrolled ? "text-gray-700" : scrollY > 150 ? "text-gray-700" : "text-white"
                      }`}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant={isScrolled || scrollY > 150 ? "outline" : "secondary"}
                  size="sm"
                  className="hidden sm:inline-flex"
                >
                  Sign In
                </Button>
                 <Button
                  className={`hidden sm:inline-flex cursor-pointer ${
                    isScrolled || scrollY > 150
                      ? "bg-amber-200 text-amber-700 hover:bg-amber-700"
                      : "bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Try AI Planner
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`md:hidden ${
                    isScrolled ? "text-gray-700" : scrollY > 150 ? "text-slate-700" : "text-white"
                  }`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <section className="relative z-10 flex items-center justify-center h-full" style={{opacity: heroOpacity}}>
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
               Your Personal
              <span className="block text-amber-300">Travel Genie</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Create personalized itineraries with AI, share with the community, and discover hidden gems through collaborative travel planning
            </p>

            {/* Search Bar */}
           <div className="bg-white rounded-2xl p-3 max-w-3xl mx-auto shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="flex-1 flex items-center space-x-3 px-4">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <Input
                    placeholder="Tell me about your dream trip... (e.g., 'Romantic getaway in Europe for 7 days')"
                    className="border-none shadow-none focus-visible:ring-0 text-gray-900 placeholder:text-gray-500 text-lg"
                  />
                </div>
                <Button className="cursor-pointer bg-amber-200 hover:bg-amber-400 text-amber-800">
                  <Brain className="h-5 w-5 mr-2" />
                  Plan with AI
                </Button>
              </div>
            </div> 
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
      </div>

      {/*Features Section */}
     <div className="py-16 px-4 max-w-7xl mx-auto">
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
      </div>

      {/* Content Section */}
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

      {/* CTA Section */}
      <section className="bg-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Ready to Plan Your Next Adventure?</h3>
          <p className="text-xl mb-8 text-coral-100">
            Join thousands of travelers using AI to create unforgettable journeys
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8">
              <Brain className="h-5 w-5 mr-2" />
              Start AI Planning
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-coral-600 px-8 bg-transparent"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Join Community
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
