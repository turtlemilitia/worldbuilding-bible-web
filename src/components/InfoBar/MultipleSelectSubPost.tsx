import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import { TDialogTypes } from '@/hooks/fieldTools/types'
import React, { Fragment, useState } from 'react'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Transition,
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, DotIcon, PlusIcon } from 'lucide-react'
import { FloatingBox } from '@/components/FloatingBox'
import Dialog from '@/components/Dialogs'

export function MultipleSelectSubPost ({
  value = [],
  onChange,
  options,
  disabled,
  dialogType,
  onCreated
}: {
  label: string;
  required?: boolean;
  value?: TSelectOption[];
  onChange: (value: TSelectOption[]) => any;
  options: (TSelectOption)[];
  link?: (id: number) => string;
  disabled?: boolean;
  dialogType?: TDialogTypes;
  onCreated?: (id: number) => any;
}) {

  const [query, setQuery] = useState('')
  const [dialogIsOpen, setDialogIsOpen] = useState<number | 'new' | false>(
    false)

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
        return option?.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Field
      className="relative w-full mt-4 py-2 px-4 rounded-lg bg-stone-800 border-stone-200 text-stone-200">
      <Combobox value={value} by="id" onChange={onChange} multiple
                disabled={disabled}>
        {({ open }) => (
          <>
            <div
              className="w-full flex justify-between py-2 rounded-lg focus:bg-stone-800">
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
                anchor={'top end'}
                className="outline-none h-96">
                <FloatingBox color={'solid'}>
                  {!filteredOptions.length && (
                    <li className="py-1 text-stone-600">No results
                      found.</li>
                  )}
                  {filteredOptions.map((option) => (
                    <ComboboxOption
                      key={option.id}
                      value={option}
                      as={Fragment}
                    >
                      {({ focus, selected }) => (
                        <li
                          className={`py-1 flex justify-between cursor-pointer`}>
                          {option.label ?? option.name}
                          {selected &&
                            <CheckIcon className="text-stone-300 h-5 w-5"/>}
                          {!selected && focus &&
                            <DotIcon className="text-stone-300 h-5 w-5"/>}
                        </li>
                      )}
                    </ComboboxOption>
                  ))}
                </FloatingBox>
              </ComboboxOptions>
            </Transition>
          </>
        )}
      </Combobox>
      {dialogIsOpen && dialogType && (
        <Dialog
          type={dialogType}
          isOpen={!!dialogIsOpen}
          setIsOpen={(isOpen) => setDialogIsOpen(isOpen ? 'new' : false)}
          id={dialogIsOpen}
          onCreated={async (data) => {
            setDialogIsOpen(false)
            await onChange([...value, data])
            onCreated && onCreated(data.id)
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