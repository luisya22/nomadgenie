import { Brain, MessageCircle } from "lucide-react";
import { Button } from "../ui/button";

export default function CallToAction() {
    return (
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
    );
}
