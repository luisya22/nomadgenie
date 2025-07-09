import { z } from 'zod';

export const tripFormSchema = z.object({
    fromDate: z.string().min(1, { message: "From date is required."}),
    toDate: z.string().min(1, { message: "To date is required."})
}).refine(data => data.fromDate <= data.toDate, {
    message: "To date cannot be before From date.",
    path: ["toDate"]
});
