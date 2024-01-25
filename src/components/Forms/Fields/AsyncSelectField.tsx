import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, DotIcon } from 'lucide-react'
import React, { Fragment, FunctionComponent, useState } from 'react'
import { TSelectOption } from './FieldMapper'
import { debounce } from 'lodash';

type TProp = {
  value: TSelectOption|null;
  onChange: (value: TSelectOption|null) => any;
  search: (term: string) => Promise<TSelectOption[]>;
}
const AsyncSelectField: FunctionComponent<TProp> = ({ value, onChange, search }) => {

  const [options, setOptions] = useState<TSelectOption[]>([]);

  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 3) {
      search(event.target.value).then(options => setOptions(options))
    } else {
      setOptions([]);
    }
  }, 500)

  return (
    <div className="relative">
      <Combobox value={value} onChange={onChange} nullable>
        {({ open }) => (
          <>
            <Combobox.Button
              className="w-full flex justify-between py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800">
              <Combobox.Input
                className="w-full bg-transparent outline-none"
                onChange={handleSearch}
                displayValue={(option: TSelectOption) => option?.name}/>
              <ChevronDownIcon className="text-stone-300 h-5 w-5"/>
            </Combobox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options
                className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-stone-800 px-3 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {!options.length && (
                  <li className="py-1 text-stone-600">No results found.</li>
                )}
                {options.map((option) => (
                  <Combobox.Option
                    key={option?.id}
                    value={option}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
                      <li className="py-1 flex justify-between hover:cursor-pointer">
                        {option?.name}
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
      </Combobox>
    </div>
  )
}

export default AsyncSelectField