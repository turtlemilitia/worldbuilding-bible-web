import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { indexLocationTypes } from '../../services/LocationTypeService'
import { TLocationType } from '../../types'

interface TProps {
  loading: boolean;
  onChange: (key: string, value: any) => void
}

const LocationInfoBar: FunctionComponent<TProps> = ({ loading, onChange }: TProps): JSX.Element => {

  const [locationTypes, setLocationTypes] = useState<TLocationType[]>([]);

  useEffect(() => {

    indexLocationTypes().then(response => setLocationTypes(response.data.data))

  }, [])

  type TSelectOption = {
    value: string|number,
    label: string
  }
  type TFields = {
    name: string,
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
      options: locationTypes.map(locationType => ({
        value: locationType.id,
        label: locationType.name
      }))
    },
  ]

  return (
    <div className={`relative z-10 translate-x-full`}>
      <div
        className={`absolute transition-all duration-1000 ${!loading ? 'top-0 opacity-100' : '-top-10 opacity-0'} ml-10`}>
        <ul
          className="rounded-3xl bg-stone-900 border border-stone-700 w-80 py-6 px-8 text-stone-300">
          {fields.map(field => {
            return (
              <li className="flex py-1">
                <span className="text-stone-400 w-1/4">{field.label}:</span>
                <div className="pl-3 w-3/4">
                  {field.type === 'select' && field.options?.length ? (
                    <div className="relative border-b border-b-gray-400 hover:border-b-gray-500">
                      <select
                        className="block appearance-none w-full bg-transparent pt-1 pb-2 pr-7 leading-tight focus:outline-none">
                        {field.options.map(({ value, label }: TSelectOption) => (
                          <option value={value}>{label}</option>
                        ))}
                      </select>
                      <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center pl-1 text-gray-700">
                        <ChevronDown/>
                      </div>
                    </div>
                  ) : 'When'}
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