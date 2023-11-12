import React, { Fragment, FunctionComponent, JSX, useEffect, useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { TCharacter, TLocationGovernmentType, TLocationType } from '../../types'
import { Listbox, Transition } from '@headlessui/react'
import { indexLocationTypes } from '../../services/LocationTypeService'
import { indexGovernmentTypes } from '../../services/GovernmentTypeService'
import { indexSpecies } from '../../services/SpeciesService'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import FieldMapper, { TSelectOption } from '../../components/Forms/Fields/FieldMapper'

type TProps = {
  loading: boolean;
  setReady?: (value: boolean) => any;
  onChange: (key: string, value: any) => void;
  data: TCharacter;
}

const CharacterInfoBar: FunctionComponent<TProps> = ({ loading, onChange, setReady, data }: TProps): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const [species, setSpecies] = useState<TLocationType[]>([])

  useEffect(() => {

    if (compendium.slug) {
      indexSpecies(compendium.slug).then(response => setSpecies(response.data.data))
    }

  }, [compendium.slug])

  type TFields = {
    name: keyof TCharacter,
    label: string,
    type: string,
    options?: TSelectOption[]
  }
  const fields: TFields[] = [
    {
      name: 'age',
      label: 'Age',
      type: 'number'
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'text'
    },
    {
      name: 'species',
      label: 'Species',
      type: 'select',
      options: species
    }
  ]

  return (
    <div
      className={`transition-all duration-1000 ${!loading ? 'top-0 opacity-100' : '-top-10 opacity-0'}`}>
      <ul
        className="rounded-3xl bg-stone-900 border border-yellow-500 shadow-sm shadow-stone-800 py-6 px-8 text-stone-300 text-sm">
        {fields.map(({ name, label, type, options }, index) => {
          const currentValue = data[name as keyof TCharacter]
          return <FieldMapper
            key={`character${name}`}
            name={name}
            label={label}
            type={type}
            options={options}
            currentValue={currentValue}
            onChange={onChange}
          />
        })}
      </ul>
    </div>
  )
}

export default CharacterInfoBar