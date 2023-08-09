import React, { Fragment, FunctionComponent, JSX, useEffect, useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { indexLocationTypes } from '../../services/LocationTypeService'
import { TLocation, TLocationGovernmentType, TLocationSize, TLocationType } from '../../types'
import { indexLocationSizes } from '../../services/LocationSizeService'
import { indexGovernmentTypes } from '../../services/GovernmentTypeService'
import { Listbox, Transition } from '@headlessui/react'

type TProps = {
  loading: boolean;
  setReady?: (value: boolean) => any;
  onChange: (key: string, value: any) => void;
  data: TLocation;
}

const LocationInfoBar: FunctionComponent<TProps> = ({ loading, onChange, setReady, data }: TProps): JSX.Element => {

  const [locationTypes, setLocationTypes] = useState<TLocationType[]>([])
  const [locationSizes, setLocationSizes] = useState<TLocationSize[]>([])
  const [governmentTypes, setGovernmentTypes] = useState<TLocationGovernmentType[]>([])

  useEffect(() => {

    indexLocationTypes().then(response => setLocationTypes(response.data.data))
    indexLocationSizes().then(response => setLocationSizes(response.data.data))
    indexGovernmentTypes().then(response => setGovernmentTypes(response.data.data))

  }, [])

  useEffect(() => {

    if (setReady && locationTypes.length && locationSizes.length && governmentTypes.length) {
      setReady(true)
    }

  }, [locationTypes, locationSizes, governmentTypes])

  type TSelectOption = {
    id: string | number,
    name: string
  }
  type TFields = {
    name: keyof TLocation,
    label: string,
    type: string,
    options?: TSelectOption[]
  }
  const fields: TFields[] = [
    {
      name: 'aliases',
      label: 'Aliases',
      type: 'text'
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: locationTypes
    },
    {
      name: 'size',
      label: 'Size',
      type: 'select',
      options: locationSizes
    },
    {
      name: 'demonym',
      label: 'Demonym',
      type: 'text'
    },
    {
      name: 'population',
      label: 'Population',
      type: 'text'
    },
    {
      name: 'governmentType',
      label: 'Government',
      type: 'select',
      options: governmentTypes
    },
  ]

  const valueAsString = (value: TLocation[keyof TLocation]): string => {
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

  return (
    <div className={`relative z-10`}>
      <div
        className={`absolute transition-all duration-1000 ${!loading ? 'top-0 opacity-100' : '-top-10 opacity-0'} left-full ml-10`}>
        <ul
          className="rounded-3xl bg-stone-900 border border-stone-700 w-80 py-6 px-8 text-stone-300 text-sm">
          {fields.map(({ name, label, type, options }) => {
            const currentValue = data[name as keyof TLocation]
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
    </div>
  )
}

export default LocationInfoBar