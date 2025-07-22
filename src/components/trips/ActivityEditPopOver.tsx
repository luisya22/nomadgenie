"use client"

import { ItineraryDetails } from "@/db/schema";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface ActivityEditPopOverProps {
    details?: ItineraryDetails
    children: React.ReactNode
}

export default function ActivityEditPopOver({children}: ActivityEditPopOverProps) {

    // const [activity, setActivity] = useState<string|null>('');
    // const [itineraryDetails, setItineraryDetails] = useState<ItineraryDetails>(details);

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="w-80 z-50">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="leading-none font-medium">Dimensions</h4>
                        <p className="text-muted-foreground text-sm">
                            Set the dimensions for the layer
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Width</Label>
                            <Input
                                id="width"
                                defaultValue="100%"
                                className="col-span-2 h-8"
                            />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
