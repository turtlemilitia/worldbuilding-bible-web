import React, { FunctionComponent } from 'react'
import Label from './Label'
import { Field, Input } from '@headlessui/react'
import clsx from 'clsx'
import { ExternalLinkIcon } from 'lucide-react'

type TProps = {
  label?: string
  required?: boolean
  value?: string
  type?: string
  onChange: (value: any) => any
  disabled?: boolean
  isLink?: true
}
const TextField: FunctionComponent<TProps> = ({ type, value, onChange, disabled, required, label, isLink }) => {
  return (
    <Field>
      {label && <Label required={required && !disabled}>{label}</Label>}
      <div className={'relative'}>
        <Input
          className={clsx(
            "w-full pl-4 pr-8 py-2 rounded-lg border-none bg-stone-700 bg-opacity-50 focus:bg-stone-800 text-inherit placeholder:text-slate-200 outline-none",
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          )}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
        {isLink && value && (
          <a href={value} target="_blank" rel="noreferrer" className={'absolute right-2 top-1/2 -translate-y-1/2 '}>
            <ExternalLinkIcon
              className={'h-5 w-5 text-stone-300'}
            />
          </a>
        )}
      </div>
    </Field>
  )
}

export default TextField