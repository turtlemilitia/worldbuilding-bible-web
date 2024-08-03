import React, { FunctionComponent } from 'react'
import SelectField from './SelectField'
import TextField from './TextField'
import AsyncSelectField from './AsyncSelectField'
import ListField from './ListField'
import MultipleAsyncSelectField from './MultipleAsyncSelectField'
import ListAddName from './ListAddName'
import { TField } from '../../../hooks/fieldTools'
import MultipleSelectField from './MultipleSelectField'

export type TSelectOption = {
  id: string | number,
  slug?: string,
  name: string
}
type TProps = TField & {
  currentValue?: any,
  onChange: (name: string, value: any) => any,
  disabled?: boolean
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
  Dialog,
  link,
  Callback,
  disabled
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
              <SelectField value={currentValue} onChange={(value) => onChange(name, value)} options={options} disabled={disabled}/>
            )}
            {type === 'asyncSelect' && search && (
              <AsyncSelectField value={currentValue} onChange={(value) => onChange(name, value)} search={search} disabled={disabled}/>
            )}
            {type === 'asyncMultiSelect' && options?.length && (
              <MultipleSelectField
                value={currentValue}
                onChange={(value) => onChange(name, value)}
                link={link}
                options={options}
                Dialog={Dialog}
                disabled={disabled}
              />
            )}
            {type === 'asyncMultiSelect' && search && (
              <MultipleAsyncSelectField
                value={currentValue}
                onChange={(value) => onChange(name, value)}
                link={link}
                search={search}
                Dialog={Dialog}
                disabled={disabled}
              />
            )}
            {['text', 'number', 'email', 'password'].includes(type) && (
              <TextField
                value={currentValue}
                onChange={(value) => onChange(name, value)}
                type={type}
                disabled={disabled}
              />
            )}
            {type === 'listAdd' && (
              <ListAddName
                value={currentValue}
                onSubmit={(value) => onChange(name, [...currentValue, value])}
                disabled={!disabled}
              />
            )}
            {type === 'callback' && Callback && (
              <Callback/>
            )}
          </div>
        )}
      </div>
    </li>
  )
}

export default FieldMapper