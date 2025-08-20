import { z } from 'zod';

export const chatFormSchema = z.object({
    message: z.string().min(1, { message: "message is required"}),
    tripId: z.number().min(1, { message: "tripId is required"}),
});

export type ChatFormvalues = z.infer<typeof tripFormSchema>;
