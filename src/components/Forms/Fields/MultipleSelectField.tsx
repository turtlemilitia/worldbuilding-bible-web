import {
  Button,
  Combobox,
  ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions,
  Field,
  Transition,
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, DotIcon, PlusIcon } from 'lucide-react'
import React, { Fragment, FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'
import { TSelectOption } from './FieldMapper'
import Label from './Label'
import Dialog from '../../Dialogs'
import { TDialogTypes } from '@/hooks/fieldTools/types'
import { Completable } from '@/types'

type TProp = {
  label: string;
  required?: boolean;
  value?: TSelectOption[];
  onChange: (value: TSelectOption[]) => any;
  options: (TSelectOption)[];
  link?: (id: number | string) => string;
  disabled?: boolean;
  dialogType?: TDialogTypes;
}
const MultipleSelectField: FunctionComponent<TProp> = ({
  value = [],
  onChange,
  options,
  link,
  disabled,
  dialogType,
  required,
  label
}) => {

  const [query, setQuery] = useState('')
  const [dialogIsOpen, setDialogIsOpen] = useState<string | false>(false)

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
        return option?.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Field className="relative w-full py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800">
      <Label required={required && !disabled}>{label}</Label>
      <Combobox value={value} by="id" onChange={onChange} multiple disabled={disabled}>
        {({ open }) => (
          <>
            {value && value.length > 0 ? (
              <ul>
                {value.map(({ id, name, completedAt }: TSelectOption & Partial<Completable>) => {
                  const displayName = completedAt ? <span className={'line-through'}>{name}</span> : name
                  return (
                    <li key={id} className="py-1">
                      {(dialogType && id) ? <Button
                          onClick={() => setDialogIsOpen(id as string)}>{displayName}</Button>
                        : (link && id ? <Link to={link(id as string)}>{displayName}</Link>
                          : displayName)}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="text-stone-500 italic">Nothing here</div>
            )}
            {!disabled && (
              <>
                <div className="w-full flex justify-between py-2 rounded-lg focus:bg-stone-800">
                  <ComboboxButton className="w-full flex justify-between">
                    <ComboboxInput
                      className="w-full bg-transparent outline-none"
                      onChange={(event) => setQuery(event.target.value)}
                      displayValue={(option: TSelectOption) => option?.name}/>
                    {!disabled && (
                      <ChevronDownIcon className="text-stone-300 h-5 w-5"/>
                    )}
                  </ComboboxButton>
                  {dialogType && (
                    <PlusIcon
                      className="text-stone-300 h-5 w-5 cursor-pointer"
                      onClick={() => setDialogIsOpen('new')}
                    />
                  )}
                </div>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ComboboxOptions
                    className="absolute z-20 left-0 top-full mt-1 max-h-56 w-full overflow-auto rounded-md bg-stone-800 px-3 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {!filteredOptions.length && (
                      <li className="py-1 text-stone-600">No results found.</li>
                    )}
                    {filteredOptions.map((option) => (
                      <ComboboxOption
                        key={option.id}
                        value={option}
                        as={Fragment}
                      >
                        {({ focus, selected }) => (
                          <li className={`py-1 flex justify-between cursor-pointer`}>
                            {option.label ?? option.name}
                            {selected && <CheckIcon className="text-stone-300 h-5 w-5"/>}
                            {!selected && focus && <DotIcon className="text-stone-300 h-5 w-5"/>}
                          </li>
                        )}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Transition>
                </>
              )}
          </>
        )}
      </Combobox>
      {dialogIsOpen && dialogType && (
        <Dialog
          type={dialogType}
          isOpen={!!dialogIsOpen}
          setIsOpen={(isOpen) => setDialogIsOpen(isOpen ? 'new' : false)}
          id={dialogIsOpen}
          onCreated={(data) => {
            setDialogIsOpen(data.id)
            onChange([...value, data])
          }}
          onUpdated={(data) => {
            onChange(value.map(single => single.id === data.id ? data : single))
          }}
          onDeleted={(id) => {
            onChange(value.filter(single => single.id !== id))
          }}
        />
      )}
    </Field>
  )
}

export default MultipleSelectField