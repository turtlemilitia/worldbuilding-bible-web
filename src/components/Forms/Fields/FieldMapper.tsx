import React, { FunctionComponent } from 'react'
import SelectField from './SelectField'
import TextField from './TextField'
import AsyncSelectField from './AsyncSelectField'
import ListField from './ListField'
import MultipleAsyncSelectField from './MultipleAsyncSelectField'
import ListAddName from './ListAddName'
import { TField } from '../../../hooks/fieldTools'
import MultipleSelectField from './MultipleSelectField'
import { Fieldset } from '@headlessui/react'

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
  dialogType,
  link,
  Callback,
  disabled,
  required
}) => {
  return (
    <li>
      <Fieldset className="antialiased relative my-6">
        <div className="font-light">
          {type === 'list' && (
            <ListField value={currentValue} link={link} label={label} required={required}/>
          )}
          {type === 'select' && (options?.length ?? 0) > 0 && (
            <SelectField
              label={label}
              required={required}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              options={options || []}
              disabled={disabled}
            />
          )}
          {type === 'asyncSelect' && search && (
            <AsyncSelectField
              label={label}
              required={required}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              search={search}
              disabled={disabled}
            />
          )}
          {type === 'multiSelect' && (options?.length ?? 0) > 0 && (
            <MultipleSelectField
              label={label}
              required={required}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              link={link}
              options={options || []}
              dialogType={dialogType}
              disabled={disabled}
            />
          )}
          {type === 'asyncMultiSelect' && search && (
            <MultipleAsyncSelectField
              label={label}
              required={required}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              link={link}
              search={search}
              dialogType={dialogType}
              disabled={disabled}
            />
          )}
          {['text', 'number', 'email', 'password'].includes(type) && (
            <TextField
              label={label}
              required={required}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              type={type}
              disabled={disabled}
            />
          )}
          {type === 'listAdd' && (
            <ListAddName
              label={label}
              required={required}
              value={currentValue}
              onSubmit={(value) => onChange(name, [...currentValue, value])}
              disabled={!disabled}
            />
          )}
          {type === 'callback' && Callback && (
            <Callback/>
          )}
        </div>
      </Fieldset>
    </li>
  )
}

export default FieldMapper