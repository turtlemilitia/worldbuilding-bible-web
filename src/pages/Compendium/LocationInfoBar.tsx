import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { indexLocationTypes } from '../../services/LocationTypeService'
import { TLocation, TLocationGovernmentType, TLocationType } from '../../types'
import { indexGovernmentTypes } from '../../services/GovernmentTypeService'
import { indexLocations } from '../../services/LocationService'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { InfoBar, TFields } from '../../components/InfoBar'

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
      search: (term: string) => indexLocations(compendium.slug, { search: term })
        .then(response => response.data.data.map(location => ({
          id: location.id,
          name: location.name
        })))
    },
    {
      name: 'children',
      label: 'Child Locations',
      type: 'list',
      link: (id: string | number) => `/compendia/${compendium.slug}/locations/${data.children?.find(child => child.id === id)?.slug || ''}`
    },
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

export default LocationInfoBar