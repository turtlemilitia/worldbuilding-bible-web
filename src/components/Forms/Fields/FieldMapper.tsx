import React, { FunctionComponent } from 'react'
import SelectField from './SelectField'
import TextField from './TextField'
import AsyncSelectField from './AsyncSelectField'
import ListField from './ListField'
import MultipleAsyncSelectField from './MultipleAsyncSelectField'
import ListAddName from './ListAddName'
import { TField } from '@/hooks/fieldTools'
import MultipleSelectField from './MultipleSelectField'
import { Fieldset } from '@headlessui/react'
import DatePickerWithPresets from '@/components/DatePicker'

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
  onChange,
  disabled,
  required,
  ...props
}) => {
  return (
    <li>
      <Fieldset className="antialiased relative my-6">
        <div className="font-light">
          {props.type === 'list' && (
            <ListField value={currentValue} link={props.link} label={label}
                       required={required}/>
          )}
          {props.type === 'select' && (props.options?.length ?? 0) > 0 && (
            <SelectField
              label={label}
              required={required}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              options={props.options || []}
              disabled={disabled}
            />
          )}
          {props.type === 'asyncSelect' && (
            <AsyncSelectField
              label={label}
              required={required}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              search={props.search}
              disabled={disabled}
            />
          )}
          {props.type === 'multiSelect' && (((props.options?.length ?? 0) > 0) || (props.dialogType)) && (
              <MultipleSelectField
                label={label}
                required={required}
                value={currentValue}
                onChange={(value) => onChange(name, value)}
                link={props.link}
                options={props.options || []}
                dialogType={props.dialogType}
                disabled={disabled}
              />
            )}
          {props.type === 'asyncMultiSelect' && (
            <MultipleAsyncSelectField
              label={label}
              required={required}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              link={props.link}
              search={props.search}
              dialogType={props.dialogType}
              disabled={disabled}
            />
          )}
          {['text', 'number', 'email', 'password'].includes(props.type) && (
            <TextField
              label={label}
              required={required}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              type={props.type}
              disabled={disabled}
            />
          )}
          {props.type === 'datePicker' && (
            <DatePickerWithPresets
              required={required}
              label={label}
              value={currentValue}
              onChange={(value) => onChange(name, value)}
              formatString={props.formatString}
            />
          )}
          {props.type === 'listAdd' && (
            <ListAddName
              label={label}
              required={required}
              value={currentValue}
              onSubmit={(value) => onChange(name, [...currentValue, value])}
              disabled={!disabled}
            />
          )}
          {props.type === 'callback' && (
            <props.Callback/>
          )}
        </div>
      </Fieldset>
    </li>
  )
}

export default FieldMapper