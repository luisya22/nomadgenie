import { Menu, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar({isScrolled, navOpacity, scrollY}: {isScrolled: boolean, navOpacity: number, scrollY: number}) {
    return (
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
                    <Link href='/travel-planner' className={`transition-colors duration-300 hover:text-blue-600 ${
                        isScrolled ? "text-gray-700" : scrollY > 150 ? "text-gray-700" : "text-white"
                      }`}>AI Planner</Link>

                    <Link href='/community' className={`transition-colors duration-300 hover:text-blue-600 ${
                        isScrolled ? "text-gray-700" : scrollY > 150 ? "text-gray-700" : "text-white"
                      }`}>Community</Link>

                    <Link href='/trips' className={`transition-colors duration-300 hover:text-blue-600 ${
                        isScrolled ? "text-gray-700" : scrollY > 150 ? "text-gray-700" : "text-white"
                      }`}>Trips</Link>

                    <Link href='/explore' className={`transition-colors duration-300 hover:text-blue-600 ${
                        isScrolled ? "text-gray-700" : scrollY > 150 ? "text-gray-700" : "text-white"
                      }`}>Explore</Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <SignedOut>
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
                    <SignInButton>
                        <Button
                            variant={isScrolled || scrollY > 150 ? "outline" : "secondary"}
                            size="sm"
                            className="hidden sm:inline-flex cursor-pointer"
                        >
                            Sign In
                        </Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn> 
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
    );
}
