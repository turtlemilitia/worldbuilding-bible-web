import React, { FunctionComponent } from 'react'
import SelectField from './SelectField'
import TextField from './TextField'
import AsyncSelectField from './AsyncSelectField'
import ListField from './ListField'
import MultipleAsyncSelectField from './MultipleAsyncSelectField'

export type TSelectOption = {
  id: string | number,
  slug?: string,
  name: string
}
type TProps = {
  name: string,
  currentValue?: any,
  label: string,
  onChange: (name: string, value: any) => any,
  type: string,
  options?: TSelectOption[],
  search?: (term: string) => any,
  link?: (id: number | string) => string
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

const FieldMapper: FunctionComponent<TProps> = ({
  name,
  label,
  currentValue,
  type,
  options,
  onChange,
  search,
  link
}) => {
  return (
    <li>
      <div className="antialiased relative my-6">
        <div
          className="font-sans-serif z-10 absolute -top-5 left-3 w-full overflow-ellipsis py-2 text-stone-300 uppercase tracking-widest text-sm">{label}:</div>
        {type === 'list' ? (
          <div
            className="font-light w-full flex justify-between py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800">
            <ListField value={currentValue} link={link}/>
          </div>
        ) : (
          <div className="font-light">
            {type === 'select' && options?.length && (
              <SelectField value={currentValue} onChange={(value) => onChange(name, value)} options={options}/>
            )}
            {type === 'asyncSelect' && search && (
              <AsyncSelectField value={currentValue} onChange={(value) => onChange(name, value)} search={search}/>
            )}
            {type === 'asyncMultiSelect' && search && (
              <MultipleAsyncSelectField
                value={currentValue}
                onChange={(value) => onChange(name, value)}
                link={link}
                search={search}
              />
            )}
            {['text', 'number', 'email', 'password'].includes(type) && (
              <TextField
                value={currentValue}
                onChange={(value) => onChange(name, value)}
                type={type}/>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default FieldMapper