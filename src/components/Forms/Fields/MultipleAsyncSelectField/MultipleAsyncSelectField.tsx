import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, DotIcon, PlusIcon } from 'lucide-react'
import React, { Fragment, FunctionComponent, useState } from 'react'
import { debounce } from 'lodash'
import { Link } from 'react-router-dom'
import { TSelectOption } from '../FieldMapper'

type TProp = {
  value?: TSelectOption[];
  onChange: (value: TSelectOption[]) => any;
  search: (term: string) => Promise<TSelectOption[]>;
  link?: (id: number | string) => string;
  disabled?: boolean;
  OpenDialog?: FunctionComponent<{isOpen: boolean; setIsOpen: (open: boolean) => any, id: string}>
}
const MultipleAsyncSelectField: FunctionComponent<TProp> = ({ value, onChange, search, link, disabled, OpenDialog }) => {

  const [options, setOptions] = useState<TSelectOption[]>([])
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

  const handleSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 3) {
      search(event.target.value).then(options => setOptions(options))
    } else {
      setOptions([])
    }
  }, 500)

  return (
    <div className="relative w-full py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800">
      <Combobox value={value} by="id" onChange={onChange} multiple disabled={disabled}>
        {({ open }) => (
          <>
            {value && value.length > 0 ? (
              <ul>
                {value.map((item) => (
                  <li key={item.id} className="py-1">
                    {link && item.slug ? <Link to={link(item.slug as string)}>{item.name}</Link> : item.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-stone-500 italic">Nothing here</div>
            )}
            <Combobox.Button
              className="w-full flex justify-between py-2 rounded-lg focus:bg-stone-800">
              <Combobox.Input
                className="w-full bg-transparent outline-none"
                onChange={handleSearch}/>
              <div className="flex">
                {!disabled && (
                  <ChevronDownIcon className="text-stone-300 h-5 w-5"/>
                )}
                {OpenDialog && (
                  <PlusIcon
                    className="text-stone-300 h-5 w-5 "
                    onClick={() => setDialogIsOpen(true)}
                  />
                )}
              </div>
            </Combobox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Combobox.Options
                className="absolute z-20 left-0 top-full mt-1 max-h-56 w-full overflow-auto rounded-md bg-stone-800 px-3 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {!options.length && (
                  <li className="py-1 text-stone-600">No results found.</li>
                )}
                {options.map((option) => (
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
      </Combobox>
      {dialogIsOpen && OpenDialog && (
        <OpenDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} id={'new'}/>
      )}
    </div>
  )
}

export default MultipleAsyncSelectField