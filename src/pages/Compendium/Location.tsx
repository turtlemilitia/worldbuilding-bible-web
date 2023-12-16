import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { indexLocations, storeLocation, TLocationRequest, updateLocation, viewLocation } from '../../services/LocationService'
import { clearLocationData, setLocationData, updateLocationData } from '../../reducers/compendium/location/locationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { addCompendiumLocationData, updateCompendiumLocationData } from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'
import { indexLocationTypes } from '../../services/LocationTypeService'
import { indexGovernmentTypes } from '../../services/GovernmentTypeService'
import { TLocation, TLocationGovernmentType, TLocationType } from '../../types'
import { RootState } from '../../store'

const Location: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { location } = useAppSelector((state: RootState) => state.location) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, locationId } = useParams() as { compendiumId: string; locationId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = locationId === 'new'

  const include = 'type,aliases,governmentType,parent,children'

  const [ready, setReady] = useState<boolean>(false)
  const [locationTypes, setLocationTypes] = useState<TLocationType[]>([])
  const [governmentTypes, setGovernmentTypes] = useState<TLocationGovernmentType[]>([])

  const reset = () => dispatch(clearLocationData(undefined))

  const fetch = async () => {
    if (locationId && !isNew) {
      await viewLocation(locationId, { include })
        .then(response => {
          dispatch(setLocationData(response.data.data))
        })
    }
    if (isNew) {
      reset()
    }
  }

  useEffect(() => {

    indexLocationTypes().then(response => setLocationTypes(response.data.data))
    indexGovernmentTypes().then(response => setGovernmentTypes(response.data.data))

  }, [])

  useEffect(() => {

    if (locationTypes.length && governmentTypes.length) {
      setReady(true)
    }

  }, [locationTypes, governmentTypes])

  const readyDataForRequest = (data: any): TLocationRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type.id,
    aliases: data.aliases,
    demonym: data.demonym,
    population: data.population,
    governmentTypeId: data.governmentType?.id,
    parentId: data.parent?.id,
  })

  const submit = (data: any): Promise<TLocation> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeLocation(compendiumId, validated, { include })
        .then(({ data }) => {
          dispatch(setLocationData(data.data))
          dispatch(addCompendiumLocationData(data.data))
          navigate(`/compendia/${compendiumId}/locations/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateLocation(locationId, validated, { include })
        .then(({ data }) => {
          dispatch(updateLocationData(data.data))
          dispatch(updateCompendiumLocationData(data.data))
          return data.data
        })
    }
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
      link: (id: string | number) => `/compendia/${compendium.slug}/locations/${location.children?.find((child: TLocation) => child.id === id)?.slug || ''}`
    },
  ]

  return (
    <Post
      key={locationId}
      ready={ready}
      initialValues={location as TLocation}
      name={location.name || ''}
      onSubmit={submit}
      onFetch={fetch}
      fields={fields}
      resetData={reset}
    />
  )
}

export default Location
