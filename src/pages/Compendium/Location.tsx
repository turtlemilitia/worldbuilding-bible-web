import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { indexLocations, storeLocation, TLocationRequest, updateLocation, viewLocation } from '../../services/LocationService'
import { clearLocationData, setLocationData, updateLocationData } from '../../reducers/compendium/location/locationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
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

  const [ready, setReady] = useState<boolean>(false)
  const [locationTypes, setLocationTypes] = useState<TLocationType[]>([])
  const [governmentTypes, setGovernmentTypes] = useState<TLocationGovernmentType[]>([])

  useEffect(() => {

    indexLocationTypes().then(response => setLocationTypes(response.data.data))
    indexGovernmentTypes().then(response => setGovernmentTypes(response.data.data))

  }, [])

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

  const fields: TFields[] = [
    {
      name: 'aliases',
      label: 'Aliases',
      type: 'text' // todo this is supposed to be a select-create
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
      isNew={locationId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/locations/${data.slug}`}
      ready={ready}

      onCreate={(data: TLocationRequest) => storeLocation(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TLocationRequest) => updateLocation(locationId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'locations', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'locations', data: data }))
      }}
      onFetch={() => viewLocation(locationId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={fields}

      persistedData={location as TLocation}
      setPersistedData={(data) => dispatch(setLocationData(data))}
      updatePersistedData={(data) => dispatch(updateLocationData(data))}
      resetPersistedData={() => dispatch(clearLocationData(undefined))}
    />
  )
}

export default Location
