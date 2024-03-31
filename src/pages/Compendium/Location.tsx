import React, { FunctionComponent, JSX, useCallback, useEffect, useState } from 'react'
import {
  destroyLocation,
  indexLocations,
  storeLocation,
  TLocationRequest,
  updateLocation,
  viewLocation
} from '../../services/LocationService'
import {
  clearLocationData,
  setLocationData,
  updateLocationData
} from '../../reducers/compendium/location/locationSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useLocation, useParams } from 'react-router-dom'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
import { TFields } from '../../components/InfoBar'
import { indexLocationTypes } from '../../services/LocationTypeService'
import { indexGovernmentTypes } from '../../services/GovernmentTypeService'
import { TLocation, TLocationGovernmentType, TLocationType } from '../../types'
import { RootState } from '../../store'
import useImageSelection from '../../utils/hooks/useImageSelection'

const Location: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { location } = useAppSelector((state: RootState) => state.location) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, locationId } = useParams() as { compendiumId: string; locationId: string } // router
  const { parent } = useLocation() as { parent?: TLocation } // use this to populate

  const [ready, setReady] = useState<boolean>(false)
  const [locationTypes, setLocationTypes] = useState<TLocationType[]>()
  const [governmentTypes, setGovernmentTypes] = useState<TLocationGovernmentType[]>()

  const { onImageSelected, addImageToSelection } = useImageSelection({
    entityType: 'locations',
    entityId: location.slug
  })

  useEffect(() => {

    if (locationTypes !== undefined && governmentTypes !== undefined) {
      setReady(true)
    }

  }, [locationTypes, governmentTypes])

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
    }
  ]
  if (compendium) {
    fields.push(
      {
        name: 'parent',
        label: 'Parent Location',
        type: 'asyncSelect',
        search: (term: string) => indexLocations(compendium.slug, { search: term })
          .then(response => response.data.data.map(location => ({
            id: location.id,
            slug: location.slug,
            name: location.name
          })))
      },
      {
        name: 'children',
        label: 'Child Locations',
        type: 'asyncMultiSelect',
        link: (id: string | number) => `/compendia/${compendium.slug}/locations/${location.children?.find((child: TLocation) => child.id === id)?.slug || ''}`,
        search: (term: string) => indexLocations(compendium.slug, { search: term })
          .then(response => response.data.data.map(location => ({
            id: location.id,
            slug: location.slug,
            name: location.name
          })))
      }
    )
  }

  const getImage = useCallback((type: 'cover' | 'profile') => location.images?.find(image => image.pivot?.type.name.toLowerCase() === type)?.original, [location.images])

  return (
    <Post
      key={locationId}
      isNew={locationId === 'new'}
      pageTypeName={'Location'}
      pathToNew={(data) => `/compendia/${compendiumId}/locations/${data.slug}`}
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={ready}

      onFetch={() => viewLocation(locationId, { include: 'type;parent;children;images' }).then(({ data }) => data.data)}
      onCreate={(data: TLocationRequest) => storeLocation(compendiumId, readyDataForRequest(data), { include: 'type;parent;children' }).then(({ data }) => data.data)}
      onUpdate={(data: TLocationRequest) => updateLocation(locationId, readyDataForRequest(data), { include: 'type;parent;children' }).then(({ data }) => data.data)}
      onDelete={() => destroyLocation(locationId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'locations', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'locations', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'locations', id: locationId }))
      }}

      fields={fields}

      persistedData={location as TLocation}
      setPersistedData={(data) => dispatch(setLocationData(data))}
      updatePersistedData={(data) => dispatch(updateLocationData(data))}
      resetPersistedData={() => dispatch(clearLocationData(undefined))}

      onImageSelected={async (imageId: number, imageType?: string) => {
        return onImageSelected(imageId, imageType)
          .then((result) => {
            if (result && result.data) {
              const images = addImageToSelection(location.images || [], result.data.data)
              dispatch(updateLocationData({ images }))
            }
            return result
          })
      }}
      coverImageUrl={getImage('cover')}
      profileImageUrl={getImage('profile')}
    />
  )
}

export default Location
