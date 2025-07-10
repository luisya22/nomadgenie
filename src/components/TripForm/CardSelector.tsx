"use client"

import { cn } from "@/lib/utils";
import { ElementType } from "react";

interface CardOption {
    value: string;
    label: string;
    description?: string;
    icon?: ElementType
}

interface CardSelectorProps {
    options: CardOption[];
    value: string|string[];
    onValueChange: (value: string | string[]) => void;
    mode?: "single" | "multi";
    className?: string;
}

export default function CardSelector({
    options,
    value,
    onValueChange,
    mode = "single",
    className
}: CardSelectorProps){

    const selectedValues = Array.isArray(value) ? value : (value ? [value] : []);

    const handleCardClick = (optionValue: string) => {
        if (mode === "single"){
            const newValue = optionValue === selectedValues[0] ? "" : optionValue;
            onValueChange(newValue);
        } else {
            if (selectedValues.includes(optionValue)){
                const newValues: string[] = selectedValues.filter((val) => val !== optionValue);
                onValueChange(newValues);
            } else {
                const newValues = [...selectedValues, optionValue];
                onValueChange(newValues);
            }
        }
    }

    return(
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:gri-cols-3 gap-4", className)}>
            {options.map((option) => {
                const IconComponent = option.icon!;
                const isSelected = selectedValues.includes(option.value); 

                return (
                    <div
                        key={option.value}
                        className={cn(
                            "p-6 border-2 rounded-lg cursor-pointer transition-all text-center",
                            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                            isSelected
                                ? "border-amber-200 bg-amber-50 text-accent-foreground"
                                : "border-input bg-background hover:bg-muted"
                        )}
                        onClick={() => handleCardClick(option.value)}
                        role={mode === 'single' ? 'radio' : 'checkbox'}
                        aria-checked={isSelected}
                        tabIndex={0}
                    >
                        <div className="flex justify-center mb-4">
                            <IconComponent className="w-12 h-12 text-foreground" strokeWidth={1}/>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{option.label}</h3>
                        {option.description ? (
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                        ):''}
                    </div>
                )
            })}
        </div>
    );
}
