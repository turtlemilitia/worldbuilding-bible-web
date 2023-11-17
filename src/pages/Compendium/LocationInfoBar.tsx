import React, { Fragment, FunctionComponent, JSX, useEffect, useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { indexLocationTypes } from '../../services/LocationTypeService'
import { TLocation, TLocationGovernmentType, TLocationType } from '../../types'
import { indexGovernmentTypes } from '../../services/GovernmentTypeService'
import { Listbox, Transition } from '@headlessui/react'
import FieldMapper, { TSelectOption } from '../../components/Forms/Fields/FieldMapper'
import { indexLocations } from '../../services/LocationService'
import compendium from './Compendium'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { setSystems } from '../../reducers/system/systemsIndexSlice'

type TProps = {
  loading: boolean;
  setReady?: (value: boolean) => any;
  onChange: (key: string, value: any) => void;
  data: TLocation;
}

const LocationInfoBar: FunctionComponent<TProps> = ({ loading, onChange, setReady, data }: TProps): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const [locationTypes, setLocationTypes] = useState<TLocationType[]>([])
  const [governmentTypes, setGovernmentTypes] = useState<TLocationGovernmentType[]>([])

  useEffect(() => {

    indexLocationTypes().then(response => setLocationTypes(response.data.data))
    indexGovernmentTypes().then(response => setGovernmentTypes(response.data.data))

  }, [])

  useEffect(() => {

    if (setReady && locationTypes.length && governmentTypes.length) {
      setReady(true)
    }

  }, [locationTypes, governmentTypes])

  type TFields = {
    name: keyof TLocation,
    label: string,
    type: string,
    options?: TSelectOption[],
    search?: (term: string) => Promise<TSelectOption[]>
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
    {
      name: 'parent',
      label: 'Parent Location',
      type: 'asyncSelect',
      search: (term) => indexLocations(compendium.slug, { search: term })
        .then(response => response.data.data.map(location => ({
          id: location.id,
          name: location.name
        })))
    },
  ]

  return (
    <div
      className={`transition-all duration-1000 ${!loading ? 'top-0 opacity-100' : '-top-10 opacity-0'}`}>
      <ul
        className="rounded-3xl bg-stone-900 border border-yellow-500 shadow-sm shadow-stone-800 py-6 px-8 text-stone-300 text-sm">
        {fields.map(({ name, label, type, options, search }, index) => {
          const currentValue = data[name as keyof TLocation]
          return <FieldMapper
            key={`location${name}`}
            name={name}
            label={label}
            type={type}
            options={options}
            currentValue={currentValue}
            onChange={onChange}
            search={search}
          />
        })}
      </ul>
    </div>
  )
}

export default LocationInfoBar