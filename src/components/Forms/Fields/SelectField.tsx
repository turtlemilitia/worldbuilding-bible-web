import { Combobox, Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import React, { Fragment, FunctionComponent, useState } from 'react'
import { TSelectOption } from './FieldMapper'

type TProp = {
  value: TSelectOption|null;
  onChange: (value: TSelectOption|null) => any;
  options: (TSelectOption|null)[]
}
const SelectField: FunctionComponent<TProp> = ({ value, onChange, options }) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
        return option?.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <div className="relative">
      <Combobox value={value} onChange={onChange} nullable>
        {({ open }) => (
          <>
            <Combobox.Button
              className="w-full flex justify-between py-2 px-4 border-b border-stone-700 hover:border-stone-500 focus:bg-stone-800">
              <Combobox.Input
                className="w-full bg-transparent outline-none"
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(option: TSelectOption) => option?.name}/>
              <ChevronDownIcon className="text-stone-700 h-5 w-5"/>
            </Combobox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options
                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-stone-800 px-3 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {filteredOptions.map((option) => (
                  <Combobox.Option
                    key={option?.id}
                    value={option}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
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
    </div>
  )
}

export default SelectField