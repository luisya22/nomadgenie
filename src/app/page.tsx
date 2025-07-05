"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/landing/Hero"
import Features from "@/components/landing/Features"
import Content from "@/components/landing/Content"
import CallToAction from "@/components/landing/CallToAction"
import NavBar from "@/components/landing/NavBar"

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
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
          style={{
            backgroundImage: `url('/images/main-landing.jpg?height=1080&width=1920')`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Navigation Bar */}
        <NavBar isScrolled={isScrolled} navOpacity={navOpacity} scrollY={scrollY}/>

        {/* Hero Content */}
        <Hero/>
      </div>

      {/*Features Section */}
      <Features/>

      {/* Content Section */}
      <Content/>

      {/* CTA Section */}
      <CallToAction/>
      
    </div>
  )
}
