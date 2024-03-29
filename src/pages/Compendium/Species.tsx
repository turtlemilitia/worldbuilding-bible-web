import React, { FunctionComponent, JSX } from 'react'
import {
  destroySpecies,
  storeSpecies,
  TSpeciesRequest,
  updateSpecies,
  viewSpecies
} from '../../services/SpeciesService'
import {
  clearSpeciesData,
  setSpeciesData,
  updateSpeciesData
} from '../../reducers/compendium/species/speciesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
import { TSpecies } from '../../types'

const Species: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, speciesId } = useParams() as { compendiumId: string; speciesId: string } // router

  const { species } = useAppSelector((state: RootState) => state.species) // redux

  const readyDataForRequest = (data: any): TSpeciesRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={speciesId}
      pageTypeName={'Species'}
      isNew={speciesId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/species/${data.slug}`}
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={true}

      onFetch={() => viewSpecies(speciesId).then(({ data }) => data.data)}
      onCreate={(data: TSpeciesRequest) => storeSpecies(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TSpeciesRequest) => updateSpecies(speciesId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroySpecies(speciesId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'species', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'species', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'species', id: speciesId }))
      }}

      fields={[]}

      persistedData={species as TSpecies}
      setPersistedData={(data) => dispatch(setSpeciesData(data))}
      updatePersistedData={(data) => dispatch(updateSpeciesData(data))}
      resetPersistedData={() => dispatch(clearSpeciesData(undefined))}
    />
  )
}

export default Species
