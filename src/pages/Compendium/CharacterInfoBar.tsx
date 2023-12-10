import React, { Fragment, FunctionComponent, JSX, useEffect, useState } from 'react'
import { TCharacter, TLocationType } from '../../types'
import { indexSpecies } from '../../services/SpeciesService'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { InfoBar, TFields } from '../../components/InfoBar'

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
    <InfoBar
      loading={loading}
      onChange={onChange}
      data={data}
      fields={fields}
    />
  )
}

export default CharacterInfoBar