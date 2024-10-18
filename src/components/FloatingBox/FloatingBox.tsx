import React from 'react'
import {cva, VariantProps} from "class-variance-authority";
import {cn} from '@/lib/utils';

const boxVariants = cva(
    'antialiased rounded-3xl shadow-md border shadow-stone-950',
    {
      variants: {
        size: {
          default: 'px-8 py-6 max-sm:px-8',
          sm: 'px-2 py-2 inline-block',
        },
        color: {
          glass: 'bg-stone-400 bg-opacity-5 backdrop-blur-sm text-stone-300',
          transparent: 'bg-stone-400 bg-opacity-10 text-stone-300',
          dark: 'bg-stone-800 bg-opacity-50 backdrop-blur-md text-stone-300',
          solid: ' bg-stone-800 text-stone-300',
        },
        border: {
          glass: 'border-opacity-30 border-stone-400',
          dark: 'border-opacity-80 border-stone-600',
          yellow: 'border-yellow-500'
        }
      },
      defaultVariants: {
        size: 'default',
        color: 'glass',
        border: 'glass'
      }
    }
)

export type TFloatingBoxProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof boxVariants>
const FloatingBox = React.forwardRef<HTMLDivElement, TFloatingBoxProps>(
    ({ className, color, size, border, ...props }, ref) => {
      return (
          <div
              className={cn(boxVariants({ color, size, border, className }))}
              ref={ref}
              {...props}
          />
      )
    }
)

export default FloatingBox