
export default function AppLayout({children}: Readonly<{children: React.ReactNode}>){
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="fixed top-0 left-0 right-0 z-50 transition-all bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="text-2xl font-bold text-gray-900">Nomad<span className="text-amber-300">Genie</span></h1>
                        <div className="hidden md:flex space-x-6">
                            {["AI Planner", "Community", "My Trips", "Explore"].map((item) => (
                                <a key={item}
                                    href="/app"
                                    className="hover:text-blue-600 text-gray-700"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
                {children}
            </main>
        </div>
    );
}
