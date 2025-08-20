"use client"

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function Providers({children}: Readonly<{children: React.ReactNode}>){
    return (
       <ClerkProvider
            signInForceRedirectUrl="/travel-planner"
            signUpForceRedirectUrl="/travel-planner"
        >
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </ClerkProvider>
 
    );
}
