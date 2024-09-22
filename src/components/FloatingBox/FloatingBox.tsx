import React, { FunctionComponent, PropsWithChildren } from 'react'
import {cva, VariantProps} from "class-variance-authority";
import {Slot} from "@radix-ui/react-slot";
import {cn} from "../../lib/utils";

const boxVariants = cva(
    'antialiased rounded-3xl shadow-md border px-8 py-6 max-sm:px-8',
    {
      variants: {
        color: {
          glass: 'shadow-stone-950 border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 backdrop-blur-md text-stone-300',
          transparent: 'shadow-stone-950 border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 text-stone-300',
          dark: 'shadow-stone-950 border-opacity-80 border-stone-600 bg-stone-800 bg-opacity-50 backdrop-blur-md text-stone-300',
          solid: 'shadow-stone-950 border-opacity-80 border-stone-600 bg-stone-800 text-stone-300',
        },
      },
      defaultVariants: {
        color: 'glass',
      }
    }
)

export type TProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof boxVariants>
const FloatingBox = React.forwardRef<HTMLDivElement, TProps>(
    ({ className, color, ...props }, ref) => {
      return (
          <div
              className={cn(boxVariants({ color, className }))}
              ref={ref}
              {...props}
          />
      )
    }
)

export default FloatingBox