"use client"

import { useFormStatus } from "react-dom";
import { addTrip } from "@/actions/tripActions";
import { useForm } from 'react-hook-form';
import { tripFormSchema, type TripFormValues } from "@/lib/validations/trip";
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input"; import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"; import { useActionState, useMemo, useRef } from "react"; import { Button } from "../ui/button";
import { cities } from "@/db/cities";
import Combobox from "../ui/combobox";
import CardSelector from "./CardSelector"; import { Building2, Coins, Flower2, Heart, Home, ImageIcon, Mountain, Music, Palette, ShoppingBag, User2, Users, UtensilsCrossed, Waves } from "lucide-react";
interface FormSubmissionState{
    message: string;
    errors?: {
        [key: string]: string[];
    }
}

const budgetOptions = [
    { value: "low", label: "Budget Explorer", description: "Under $100/day", icon: Coins },
    { value: "medium", label: "Comfort Traveler", description: "$100-300/day", icon: Coins },
    { value: "high", label: "Luxury Wanderer", description: "$300+/day", icon: Coins },
];

const travelGroups = [
    { value: "solo", label: "Solo Adventure", description: "Just me, myself & I", icon: User2 },
    { value: "couple", label: "Romantic Getaway", description: "Me + my special someone", icon: Heart },
    { value: "family", label: "Family Fun", description: "Kids & family members", icon: Home },
    { value: "friends", label: "Squad Goals", description: "Friends group trip", icon: Users },
];

const activityOptions = [
    { value: "beaches", label: "Beach & Sun", icon: Waves },
    { value: "sightseeing", label: "City Sightseeing", icon: Building2 },
    { value: "outdoor", label: "Outdoor Adventures", icon: Mountain },
    { value: "culture", label: "Culture & History", icon: Palette },
    { value: "food", label: "Food & Dining", icon: UtensilsCrossed },
    { value: "nightlife", label: "Nightlife & Entertainment", icon: Music },
    { value: "shopping", label: "Shopping", icon: ShoppingBag },
    { value: "wellness", label: "Wellness & Spa", icon: Flower2 },
    { value: "photography", label: "Photography", icon: ImageIcon },
    { value: "local", label: "Local Experiences", icon: Home },
];


export default function TripForm(){

    const formRef = useRef<HTMLFormElement>(null);
    const initialFormState: FormSubmissionState = { message: '' };
    const [formState, formAction] = useActionState<FormSubmissionState, FormData>(addTrip, initialFormState);

    const form = useForm<TripFormValues>({
        resolver: zodResolver(tripFormSchema),
        defaultValues: {
            destination: '',
            fromDate: '',
            toDate: '',
            budget: '',
            activities: [],
            travelGroup: '',
        },
        values: formState.message.includes('successfully') ? {
            destination: '',
            fromDate: '',
            toDate: '',
            budget: '',
            activities: [],
            travelGroup: '',
        } : undefined,
    });

    const { pending } = useFormStatus(); 

    const onSubmit = form.handleSubmit(async (data: TripFormValues) => {
        form.clearErrors();

        console.log("Here", data);

        const formData = new FormData();

        formData.set('destination', data.destination);
        formData.set('fromDate', data.fromDate);
        formData.set('toDate', data.toDate);
        formData.set('budget', data.budget);
        formData.set('travelGroup', data.travelGroup);

        formData.delete('activities');
        data.activities.forEach((activity: string) => {
            formData.append("activities", activity);
        });

        const result = await addTrip(formState, formData);
        console.log("Did this", result);

        if (result?.errors) {
            for (const [fieldName, errorMessages] of Object.entries(result.errors)) {
                if (fieldName !== '_form') {
                    form.setError(fieldName as keyof TripFormValues, {
                        type: 'server',
                        message: errorMessages.join(', '),
                    });
                } else {
                    form.setError('root.serverError', {
                        type: 'server',
                        message: errorMessages.join(', ')
                    });
                }
            }
        } 
    });

    const cityOptions = useMemo(() => {
        return cities.map((city) => {
            return {value: `${city.name}, ${city.country}`, label: `${city.name}, ${city.country}`}
        })
    }, []);

    return (
        <div>
           <Form {...form}> 
                <form action={formAction} onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
                    <h2 className="text-2xl font-semibold text-gray-900 my-6">Where would you love to escape to?</h2>
                    <FormField
                        control={form.control}
                        name="destination"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Combobox
                                        options={cityOptions}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        className="w-full border-gray-900 py-6"
                                    />
                                </FormControl>
                                {formState.errors?.destination && (
                                    <p className="text-red-500 text-xs italic mt-1"> 
                                        {formState.errors.destination.join(', ')}
                                    </p>
                                )}
                            </FormItem>
                        )}
                    />
                    <hr className="my-16 text-gray-900"/>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">When does your adventure begin?</h2>
                        </div>
                        <FormField
                            control={form.control}
                            name="fromDate"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="date" {...field} className="py-6"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <hr className="my-16 text-gray-900"/>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900">When do you return from paradise?</h2>
                        </div>
                        <FormField
                            control={form.control}
                            name="toDate"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="date" {...field} className="py-6"/>
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
                    </div>
                    <hr className="my-16 text-gray-900"/>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 m-2">How much are you planning to spend on this adventure?</h2>
                            <p className="text-gray-600">The budget is exclusively allocated for activities and dining purposes.</p>
                        </div>
                         <FormField
                            control={form.control}
                            name="budget"
                            render={({field}) => (
                                <FormItem>
                                   <FormControl> 
                                        <CardSelector
                                            options={budgetOptions}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                        />
                                   </FormControl>
                                    {formState.errors?.budget && (
                                        <p className="text-red-500 text-xs italic mt-1"> 
                                            {formState.errors.budget.join(', ')}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                    </div>
                    <hr className="my-16 text-gray-900"/>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 m-2">Is this a solo escape, a romantic getaway, or a group trip?</h2>
                        </div>
                        <FormField
                            control={form.control}
                            name="travelGroup"
                            render={({field}) => (
                                <FormItem>
                                   <FormControl> 
                                        <CardSelector
                                            options={travelGroups}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                        />
                                   </FormControl>
                                    {formState.errors?.travelGroup && (
                                        <p className="text-red-500 text-xs italic mt-1"> 
                                            {formState.errors.travelGroup.join(', ')}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                    </div>
                    <hr className="my-16 text-gray-900"/>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 m-2">What would you love to do there?</h2>
                        </div>
                        <FormField
                            control={form.control}
                            name="activities"
                            render={({field}) => (
                                <FormItem>
                                   <FormControl> 
                                        <CardSelector
                                            options={activityOptions}
                                            value={field.value as string[]}
                                            onValueChange={field.onChange}
                                            className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                            mode="multi"
                                        />
                                   </FormControl>
                                    {formState.errors?.activities && (
                                        <p className="text-red-500 text-xs italic mt-1"> 
                                            {formState.errors.activities.join(', ')}
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                    </div>
                    <hr className="mt-12 text-gray-900"/>
                    {formState.message && formState.errors && Object.keys(formState.errors).length !== 0 && (
                        <p className="text-red-500 text-xs italic mb-4">{formState.message}</p>
                    )}
                    <div className="flex justify-end pt-8">
                        <Button
                            type="submit"
                            disabled={pending}
                            className="cursor-pointer bg-amber-200 hover:bg:amber-400 text-amber-800 font-bold mb-10"
                        >
                            {pending ? 'Adding Trip...' : 'Add Trip'}
                        </Button>
                    </div>
                </form>
           </Form>
        </div>
    );

}
