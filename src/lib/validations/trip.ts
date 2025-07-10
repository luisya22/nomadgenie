import { z } from 'zod';

export const tripFormSchema = z.object({
    fromDate: z.string().min(1, { message: "From date is required."}),
    toDate: z.string().min(1, { message: "To date is required."}),
    destination: z.string().min(1, { message: "Destination is required." }),
    budget: z.string().min(1, { message: "Budget is required." }),
    travelGroup: z.string().min(1, { message: "Travel Group is required. "}),
    activities: z.array(z.string()).min(1, {
        message: "Please select at least one interest."
    })
}).refine(data => data.fromDate <= data.toDate, {
    message: "To date cannot be before From date.",
    path: ["toDate"]
});
