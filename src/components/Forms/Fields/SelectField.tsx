import { Combobox, Field, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import React, { Fragment, FunctionComponent, useState } from 'react'
import { TSelectOption } from './FieldMapper'
import Label from './Label'

type TProp = {
  label?: string
  required?: boolean
  value: TSelectOption|null;
  onChange: (value: TSelectOption|null) => any;
  options: (TSelectOption|null)[];
  disabled?: boolean
}
const SelectField: FunctionComponent<TProp> = ({ value, onChange, options, disabled, label, required }) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
        return option?.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Field className="relative">
      {label && <Label required={required && !disabled}>{label}</Label>}
      <Combobox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <>
            <Combobox.Button
              className="w-full flex justify-between py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800">
              <Combobox.Input
                className="w-full bg-transparent outline-none"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(option: TSelectOption) => option?.name}/>
              {!disabled && (
                <ChevronDownIcon className="text-stone-300 h-5 w-5"/>
              )}
            </Combobox.Button>
            {value && !disabled && !required && (
              <div className={'absolute top-2 right-10 cursor-pointer'}>
                <XIcon className="text-stone-300 h-5 w-5" onClick={() => onChange(null)}/>
              </div>
            )}
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options
                anchor={'bottom'}
                className="absolute z-20 mt-1 max-h-56 overflow-auto rounded-md bg-stone-800 text-stone-200 px-3 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option?.id}
                    value={option}
                    as={Fragment}
                  >
                    {({ focus, selected }) => (
                      <li className="py-1 flex justify-between hover:cursor-pointer">
                        {option?.name}
                        {selected && <CheckIcon className="text-stone-700 h-5 w-5"/>}
                      </li>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
    </Field>
  )
}

export default SelectField