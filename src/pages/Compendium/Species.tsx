import React, { FunctionComponent, JSX } from 'react'
import { storeSpecies, TSpeciesRequest, updateSpecies, viewSpecies } from '../../services/SpeciesService'
import {
  clearSpeciesData,
  setSpeciesData,
  updateSpeciesData
} from '../../reducers/compendium/species/speciesSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
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
      ready={true}

      onCreate={(data: TSpeciesRequest) => storeSpecies(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TSpeciesRequest) => updateSpecies(speciesId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'species', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'species', data: data }))
      }}
      onFetch={() => viewSpecies(speciesId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={species as TSpecies}
      setPersistedData={(data) => dispatch(setSpeciesData(data))}
      updatePersistedData={(data) => dispatch(updateSpeciesData(data))}
      resetPersistedData={() => dispatch(clearSpeciesData(undefined))}
    />
  )
}

export default Species
