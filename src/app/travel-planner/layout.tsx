import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function AppLayout({children}: Readonly<{children: React.ReactNode}>){
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-8">
                            <Link className="text-2xl font-bold text-gray-900 cursor-pointer" href="/">Nomad<span className="text-amber-300">Genie</span></Link> 
                            <div className="hidden md:flex space-x-6">
                                <Link href='/travel-planner' className="hover:text-blue-600 text-gray-700">AI Planner</Link>
                                <Link href='/community' className="hover:text-blue-600 text-gray-700">Community</Link>
                                <Link href='/trips' className="hover:text-blue-600 text-gray-700">Trips</Link>
                                <Link href='/explore' className="hover:text-blue-600 text-gray-700">Explore</Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <SignedIn>
                                <UserButton/>
                            </SignedIn> 
                        </div>
                    </div>
                </div>
            </nav>
            <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"> 
                {children}
            </main>
        </div>
    );
}
