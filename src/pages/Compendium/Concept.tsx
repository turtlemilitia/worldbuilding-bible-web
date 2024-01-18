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
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
import { TConcept } from '../../types'

const Concept: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, conceptId } = useParams() as { compendiumId: string; conceptId: string } // router

  const { concept } = useAppSelector((state: RootState) => state.concept) // redux

  const navigate = useNavigate()

  const isNew: boolean = conceptId === 'new'

  const readyDataForRequest = (data: any): TConceptRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TConcept> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeConcept(compendiumId, validated)
        .then(({ data }) => {
          dispatch(addCompendiumChildData({ field: 'concepts', data: data.data }))
          navigate(`/compendia/${compendiumId}/concepts/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateConcept(conceptId, validated)
        .then(({ data }) => {
          dispatch(updateCompendiumChildData({ field: 'concepts', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={conceptId}
      isNew={isNew}
      remoteData={concept as TConcept}
      onSave={submit}
      onFetch={() => viewConcept(conceptId, { include: 'compendium' }).then(({data}) => data.data)}
      fields={[]}
      ready={true}
      setRemoteData={(data) => dispatch(setConceptData(data))}
      resetData={() => dispatch(clearConceptData(undefined))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Concept
