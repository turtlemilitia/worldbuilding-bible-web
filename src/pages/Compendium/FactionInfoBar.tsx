import React, { Fragment, FunctionComponent, JSX, useEffect } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { TItem } from '../../types'
import { Listbox, Transition } from '@headlessui/react'

type TProps = {
  loading: boolean;
  setReady?: (value: boolean) => any;
  onChange: (key: string, value: any) => void;
  data: TItem;
}

const ItemInfoBar: FunctionComponent<TProps> = ({ loading, onChange, setReady, data }: TProps): JSX.Element => {

  type TSelectOption = {
    id: string | number,
    name: string
  }
  type TFields = {
    name: keyof TItem,
    label: string,
    type: string,
    options?: TSelectOption[]
  }
  const fields: TFields[] = [
    //
  ]

  const valueAsString = (value: TItem[keyof TItem]): string => {
    if (typeof value === 'string') {
      // Handle string type
      return value // Example of using a string method
    }
    if (typeof value === 'number') {
      // Handle number type
      return value.toFixed(2) // Example of using a number method
    }
    return ''
  }

  return (
    <div
      className={`transition-all duration-1000 ${!loading ? 'top-0 opacity-100' : '-top-10 opacity-0'}`}>
      <ul
        className="rounded-3xl bg-stone-900 border border-yellow-500 shadow-sm shadow-stone-800 py-6 px-8 text-stone-300 text-sm">
        {fields.map(({ name, label, type, options }) => {
          const currentValue = data[name as keyof TItem]
          return (
            <li className="flex py-1">
              <span className="text-stone-400 w-2/5 overflow-ellipsis">{label}:</span>
              <div className="pl-3 w-3/5">
                {type === 'select' && options?.length ? (
                  <div className="relative border-b border-b-gray-400 hover:border-b-gray-500">
                    <Listbox value={currentValue} onChange={(value) => onChange(name, value)}>
                      {({ open }) => (
                        <>
                          <Listbox.Button
                            className="w-full flex justify-between pb-1">
                            <div>
                              {valueAsString(currentValue)}
                            </div>
                            <ChevronDownIcon className="text-stone-700 h-5 w-5"/>
                          </Listbox.Button>
                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options
                              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-stone-800 px-3 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {options.map((option: TSelectOption) => (
                                <Listbox.Option
                                  value={option}
                                  className="py-1"
                                >
                                  {option.name}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </>
                      )}
                    </Listbox>
                  </div>
                ) : (
                  <input
                    className="w-full border-none bg-transparent text-inherit placeholder:text-slate-200 outline-none"
                    type={type}
                    value={valueAsString(currentValue)}
                    onChange={(e) => onChange(name, e.target.value)}
                  />
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ItemInfoBar