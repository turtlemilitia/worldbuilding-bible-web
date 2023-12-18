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

  const navigate = useNavigate()

  const isNew: boolean = speciesId === 'new'

  const reset = () => dispatch(clearSpeciesData(undefined))

  const fetch = async () => {
    if (speciesId && !isNew) {
      await viewSpecies(speciesId, { include: 'compendium' })
        .then(response => {
          dispatch(setSpeciesData(response.data.data))
        })
    }
    if (isNew) {
      dispatch(clearSpeciesData(undefined))
    }
  }

  const readyDataForRequest = (data: any): TSpeciesRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TSpecies> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeSpecies(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setSpeciesData(data.data))
          dispatch(addCompendiumChildData({ field: 'species', data: data.data }))
          navigate(`/compendia/${compendiumId}/species/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateSpecies(speciesId, validated)
        .then(({ data }) => {
          dispatch(updateSpeciesData(data.data))
          dispatch(updateCompendiumChildData({ field: 'species', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={speciesId}
      initialValues={species as TSpecies}
      name={species.name || ''}
      onSubmit={submit}
      onFetch={fetch}
      fields={[]}
      ready={true}
      resetData={reset}
    />
  )
}

export default Species
