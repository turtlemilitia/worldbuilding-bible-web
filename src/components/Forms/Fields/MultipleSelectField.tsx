import { Button, Combobox, Field, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, DotIcon, PlusIcon } from 'lucide-react'
import React, { Fragment, FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'
import { TSelectOption } from './FieldMapper'
import Label from './Label'
import Dialog from '../../Dialogs'
import { TDialogTypes } from '@/hooks/fieldTools/types'

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
          && !value?.find(singleValue => singleValue.id === option.id)
      })

  return (
    <Field className="relative w-full py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800">
      <Label required={required}>{label}</Label>
      <Combobox value={value} by="id" onChange={onChange} multiple disabled={disabled}>
        {({ open }) => (
          <>
            {value && value.length > 0 ? (
              <ul>
                {value.map((item) => (
                  <li key={item.id} className="py-1">
                    {(dialogType && item.slug) ? <Button
                        onClick={() => setDialogIsOpen(item.slug as string)}>{item.name}</Button>
                      : (link && item.slug ? <Link to={link(item.slug as string)}>{item.name}</Link>
                        : item.name)}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-stone-500 italic">Nothing here</div>
            )}
            {!disabled && (
              <>
                <div className="w-full flex justify-between py-2 rounded-lg focus:bg-stone-800">
                  <Combobox.Button className="w-full flex justify-between">
                    <Combobox.Input
                      className="w-full bg-transparent outline-none"
                      onChange={(event) => setQuery(event.target.value)}
                      displayValue={(option: TSelectOption) => option?.name}/>
                    {!disabled && (
                      <ChevronDownIcon className="text-stone-300 h-5 w-5"/>
                    )}
                  </Combobox.Button>
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
                  <Combobox.Options
                    className="absolute z-20 left-0 top-full mt-1 max-h-56 w-full overflow-auto rounded-md bg-stone-800 px-3 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {!filteredOptions.length && (
                      <li className="py-1 text-stone-600">No results found.</li>
                    )}
                    {filteredOptions.map((option) => (
                      <Combobox.Option
                        key={option.id}
                        value={option}
                        as={Fragment}
                      >
                        {({ active, selected }) => (
                          <li className={`py-1 flex justify-between cursor-pointer`}>
                            {option.name}
                            {selected && <CheckIcon className="text-stone-300 h-5 w-5"/>}
                            {!selected && active && <DotIcon className="text-stone-300 h-5 w-5"/>}
                          </li>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
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
          id={dialogIsOpen || 'new'}
          onCreated={(data) => {
            setDialogIsOpen(data.slug)
            onChange([...value, data])
          }}
          onUpdated={(data) => {
            onChange(value.map(single => single.slug === data.slug ? data : single))
          }}
          onDeleted={(id) => {
            onChange(value.filter(single => single.slug !== id))
          }}
        />
      )}
    </Field>
  )
}

export default MultipleSelectField