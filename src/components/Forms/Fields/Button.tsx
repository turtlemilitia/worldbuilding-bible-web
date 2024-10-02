import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-lg pl-10 pr-9 py-3 text-sm font-sans-serif uppercase ring-offset-background transition-colors duration-500 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-emerald-700 hover:bg-amber-500 text-white",
                default: "bg-stone-700 bg-opacity-50 focus:bg-stone-800 hover:bg-stone-800 text-white",
                glass: "shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 hover:bg-opacity-50 backdrop-blur-md text-stone-300",
                destructive: "bg-red-600 hover:bg-red-600/90",
                outline: "border border-stone-300 bg-transparent hover:bg-stone-200 text-stone-300 hover:text-stone-900",
                secondary: "bg-stone-400 text-stone-800 hover:bg-stone-400/80",
                ghost: "text-stone-200 hover:bg-stone-200 hover:text-stone-800",
                link: "underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2 tracking-widest",
                sm: "h-9 rounded-md px-3 tracking-widest",
                lg: "h-11 rounded-lg px-8 tracking-widest",
                icon: "h-10 w-10 p-0 rounded-full",
                small_icon: "h-8 w-8 p-0 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
