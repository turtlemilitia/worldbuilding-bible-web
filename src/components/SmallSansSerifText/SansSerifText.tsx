import React, { FunctionComponent, PropsWithChildren } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

const sansSerifTextVariants = cva(
  'uppercase font-sans-serif tracking-widest',
  {
    variants: {
      size: {
        'xxs': 'text-xxs',
        'xs': 'text-xs',
        'normal': '',
      },
      colour: {
        'light': 'text-stone-200',
        'dark': 'text-stone-800'
      }
    },
    defaultVariants: {
      size: 'xs',
      colour: 'light'
    },
  },
)

interface TOwnProps extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sansSerifTextVariants> {
}

const SansSerifText: FunctionComponent<TOwnProps> = ({
  size,
  children,
  className,
  ...props
}) => {
  return <div className={sansSerifTextVariants({ size, className })} {...props}>
    {children}
  </div>
}

export default SansSerifText