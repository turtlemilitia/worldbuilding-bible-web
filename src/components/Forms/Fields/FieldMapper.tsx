import React, { Fragment, FunctionComponent } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import { TLocation } from '../../../types'
import SelectField from './SelectField'
import TextField from './TextField'
import AsyncSelectField from './AsyncSelectField'


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
  search?: (term: string) => any;
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

const FieldMapper: FunctionComponent<TProps> = ({ name, label, currentValue, type, options, onChange, search }) => {
  return (
    <li className="flex">
      <span className="text-stone-400 w-2/5 overflow-ellipsis py-2">{label}:</span>
      <div className="pl-3 w-3/5">
        {type === 'select' && options?.length && (
          <SelectField value={currentValue} onChange={(value) => onChange(name, value)} options={options}/>
        )}
        {type === 'asyncSelect' && search && (
          <AsyncSelectField value={currentValue} onChange={(value) => onChange(name, value)} search={search} />
        )}
        {type === 'text' && (
          <TextField value={currentValue} onChange={(value) => onChange(name, value)}/>
        )}
      </div>
    </li>
  )
}

export default FieldMapper;