import React, { FunctionComponent } from 'react'
import Label from './Label'
import { Field, Input } from '@headlessui/react'
import clsx from 'clsx'

type TProps = {
  label?: string
  required?: boolean
  value?: string;
  type?: string;
  onChange: (value: any) => any;
  disabled?: boolean
}
const TextField: FunctionComponent<TProps> = ({ type, value, onChange, disabled, required, label }) => {
  return (
    <Field>
      {label && <Label required={required && !disabled}>{label}</Label>}
      <Input
        className={clsx(
          "w-full px-4 py-2 rounded-lg border-none bg-stone-700 bg-opacity-50 focus:bg-stone-800 text-inherit placeholder:text-slate-200 outline-none",
          '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        )}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </Field>
  )
}

export default TextField