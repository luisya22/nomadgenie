"use client"

import { useFormStatus } from "react-dom";
import { addTrip } from "@/actions/tripActions";
import { useForm } from 'react-hook-form';
import { tripFormSchema, type TripFormValues } from "@/lib/validations/trip";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useActionState } from "react";
import { Button } from "../ui/button";

interface FormSubmissionState{
    message: string;
    errors?: {
        [key: string]: string[];
    }
}

export default function TripForm(){

    const initialFormState: FormSubmissionState = { message: '' };
    const [formState, formAction] = useActionState<FormSubmissionState, FormData>(addTrip, initialFormState);

    const form = useForm<TripFormValues>({
        resolver: zodResolver(tripFormSchema),
        defaultValues: {
            fromDate: '',
            toDate: '',
        },
        values: formState.message.includes('successfully') ? { fromDate: '', toDate: '' } : undefined,
    });

    console.log(formState.errors);

    const { pending } = useFormStatus(); 

    return (
        <div>
           <Form {...form}> 
                <form action={formAction}>
                    <FormField
                        control={form.control}
                        name="fromDate"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>From Date:</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field}/>
                                </FormControl>
                                <FormMessage/>
                                {formState.errors?.fromDate && (
                                   <p className="text-red-500 text-xs italic mt-1"> 
                                        {formState.errors.fromDate.join(', ')}
                                   </p>
                                )}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="toDate"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>From Date:</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field}/>
                                </FormControl>
                                <FormMessage/>
                                {formState.errors?.fromDate && (
                                   <p className="text-red-500 text-xs italic mt-1"> 
                                        {formState.errors.toDate.join(', ')}
                                   </p>
                                )}
                            </FormItem>
                        )}
                    />
                    {formState.message && formState.errors && Object.keys(formState.errors).length !== 0 && (
                        <p className="text-red-500 text-xs italic mb-4">{formState.message}</p>
                    )}
                    <Button
                        type="submit"
                        disabled={pending}
                        className="cursor-poiner bg-amber-200 hover:bg:amber-400 text-amber-800 font-bold"
                    >
                        {pending ? 'Adding Trip...' : 'Add Trip'}
                    </Button>
                </form>
           </Form>
        </div>
    );

}
