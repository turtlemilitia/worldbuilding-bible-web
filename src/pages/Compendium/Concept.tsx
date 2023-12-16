import React, { FunctionComponent, JSX } from 'react'
import { storeConcept, TConceptRequest, updateConcept, viewConcept } from '../../services/ConceptService'
import {
  clearConceptData,
  setConceptData,
  updateConceptData
} from '../../reducers/compendium/concept/conceptSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumConceptData,
  updateCompendiumConceptData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
import { TConcept } from '../../types'

const Concept: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, conceptId } = useParams() as { compendiumId: string; conceptId: string } // router

  const { concept } = useAppSelector((state: RootState) => state.concept) // redux

  const navigate = useNavigate()

  const isNew: boolean = conceptId === 'new'

  const reset = () => dispatch(clearConceptData(undefined))

  const fetch = async () => {
    if (conceptId && !isNew) {
      await viewConcept(conceptId, { include: 'compendium' })
        .then(response => {
          dispatch(setConceptData(response.data.data))
        })
    }
    if (isNew) {
      dispatch(clearConceptData(undefined))
    }
  }

  const readyDataForRequest = (data: any): TConceptRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TConcept> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeConcept(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setConceptData(data.data))
          dispatch(addCompendiumConceptData(data.data))
          navigate(`/compendia/${compendiumId}/concepts/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateConcept(conceptId, validated)
        .then(({ data }) => {
          dispatch(updateConceptData(data.data))
          dispatch(updateCompendiumConceptData(data.data))
          return data.data
        })
    }
  }

  return (
    <Post
      key={conceptId}
      initialValues={concept as TConcept}
      name={concept.name || ''}
      onSubmit={submit}
      onFetch={fetch}
      fields={[]}
      ready={true}
      resetData={reset}
    />
  )
}

export default Concept
