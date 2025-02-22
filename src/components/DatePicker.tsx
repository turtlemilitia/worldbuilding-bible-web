'use client'

import * as React from 'react'
import { addDays, format, parse } from 'date-fns'
import { Calendar as CalendarIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Calendar } from '@/components/Calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/Popover'
import { FunctionComponent, useCallback, useMemo, useState } from 'react'
import SelectField from '@/components/Forms/Fields/SelectField'
import Label from '@/components/Forms/Fields/Label'
import { Button, Field } from '@headlessui/react'
import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'

type TOwnProps = {
  label: string;
  value: string;
  onChange: (value: string|null) => any;
  formatString?: string;
  required?: boolean;
  disabled?: boolean;
}
export const DatePickerWithPresets: FunctionComponent<TOwnProps> = ({
  label,
  value,
  onChange,
  formatString = 'yyyy-M-d H:m:s',
  required = false,
  disabled
}) => {

  const [selected, setSelected] = useState<TSelectOption | null>(null)
  const date = useMemo(() => value ? parse(value, formatString, new Date()) : undefined, [value, formatString])
  const setDate = useCallback((dateObject: Date) => {
    onChange(format(dateObject, 'yyyy-M-d H:m:s'))
  }, [])

  return (
    <Field className={'relative'}>
      {label && <Label required={required && !disabled}>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            className={cn(
              'rounded-lg px-4 py-3',
              'inline-flex items-center w-full justify-start text-left font-normal',
              'bg-stone-700 bg-opacity-50 focus:bg-stone-800 hover:bg-stone-800',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4"/>
            {date ? format(date, 'PPP') : <span className={'text-stone-400 italic'}>Pick a date</span>}
            {!disabled && !required && <XIcon className="ml-auto h-4 w-4" onClick={() => onChange(null)}/>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto flex-col space-y-2 p-2 bg-stone-800 border-stone-700">
          <SelectField
            value={selected}
            onChange={(value) => {
              setSelected(selected)
              if (value) {
                setDate(addDays(new Date(), parseInt(String(value.id))))
              }
            }}
            options={[
              { id: 0, name: 'Today' },
              { id: 1, name: 'Tomorrow' },
              { id: 3, name: 'In 3 Days' },
              { id: 7, name: 'In 7 Days' },
            ]}
          />
          <div className="rounded-lg">
            <Calendar mode="single" selected={date} onSelect={setDate} required={true}/>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  )
}

export default DatePickerWithPresets
