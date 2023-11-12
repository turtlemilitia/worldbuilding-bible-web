import React, { Fragment, FunctionComponent } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import { TLocation } from '../../../types'


export type TSelectOption = {
  id: string | number,
  name: string
}
type TProps = {
  name: string;
  currentValue?: any;
  label: string;
  onChange: (name: string, value: any) => any;
  type?: string;
  options?: TSelectOption[];
}


const valueAsString = (value: any): string => {
  if (typeof value === 'string') {
    // Handle string type
    return value // Example of using a string method
  }
  if (typeof value === 'number') {
    // Handle number type
    return value.toFixed(2) // Example of using a number method
  }
  if (Array.isArray(value)) {
    // Handle array type
    return value.join(', ') // Example of using a number method
  }
  if (typeof value === 'object' && value !== null) {
    // Handle TLocation or other object types
    return value.name // Access the name property
  }
  return ''
}

const FieldMapper: FunctionComponent<TProps> = ({ name, label, currentValue, type, options, onChange }) => {
  return (
    <li className="flex py-1">
      <span className="text-stone-400 w-2/5 overflow-ellipsis">{label}:</span>
      <div className="pl-3 w-3/5">
        {type === 'select' && options?.length ? (
          <div className="relative border-b border-b-stone-400 hover:border-b-stone-500">
            <Listbox value={currentValue} onChange={(value) => onChange(name, value)}>
              {({ open }) => (
                <>
                  <Listbox.Button
                    className="w-full flex justify-between pb-1">
                    <div>
                      {valueAsString(currentValue)}
                    </div>
                    <ChevronDownIcon className="text-stone-700 h-5 w-5"/>
                  </Listbox.Button>
                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options
                      className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-stone-800 px-3 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {options.map((option: TSelectOption) => (
                        <Listbox.Option
                          value={option}
                          className="py-1"
                        >
                          {option.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </>
              )}
            </Listbox>
          </div>
        ) : (
          <input
            className="w-full border-none bg-transparent text-inherit placeholder:text-slate-200 outline-none"
            type={type}
            value={valueAsString(currentValue)}
            onChange={(e) => onChange(name, e.target.value)}
          />
        )}
      </div>
    </li>
  )
}

export default FieldMapper;