"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeft, ChevronLeftIcon,
  ChevronRight, ChevronRightIcon,
  ChevronUp,
  ChevronUpIcon,
} from 'lucide-react'
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/Forms/Fields/Button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 text-stone-200", className)}
      classNames={{
        months: "relative flex flex-col sm:flex-row",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center w-[calc(100%-60px)] m-auto",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        button_next: cn(
          buttonVariants({ variant: "glass", size: 'icon' }),
          "absolute right-1 top-0",
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        button_previous: cn(
          buttonVariants({ variant: "glass", size: 'icon' }),
          "absolute left-1 top-0",
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost", size: 'icon' }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        range_end: "day-range-end",
        selected:
          "bg-emerald-500",
        today: "bg-burnOrange",
        outside:
          "day-outside text-stone-400 opacity-50 aria-selected:bg-stone-400/50 aria-selected:text-stone-400 aria-selected:opacity-30",
        disabled: "text-stone-400 opacity-50",
        range_middle:
          "aria-selected:bg-emerald-500 aria-selected:text-stone-200",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ ...props }) => {
          switch (props.orientation) {
            case 'up':
              return <ChevronUpIcon className="h-4 w-4"/>
            case 'down':
              return <ChevronDownIcon className="h-4 w-4"/>
            case 'left':
              return <ChevronLeftIcon className="h-4 w-4"/>
            case 'right':
              return <ChevronRightIcon className="h-4 w-4"/>
            default:
              return <></>
          }
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
