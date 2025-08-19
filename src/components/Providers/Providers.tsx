"use client"

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Providers({children}: Readonly<{children: React.ReactNode}>){
    return (
       <ClerkProvider
            signInForceRedirectUrl="/travel-planner"
            signUpForceRedirectUrl="/travel-planner"
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ClerkProvider>
 
    );
}
