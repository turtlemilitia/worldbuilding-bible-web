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

  const readyDataForRequest = (data: any): TConceptRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={conceptId}
      isNew={conceptId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/concepts/${data.slug}`}
      ready={true}

      onCreate={(data: TConceptRequest) => storeConcept(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TConceptRequest) => updateConcept(conceptId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'concepts', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'concepts', data: data }))
      }}
      onFetch={() => viewConcept(conceptId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={concept as TConcept}
      setPersistedData={(data) => dispatch(setConceptData(data))}
      updatePersistedData={(data) => dispatch(updateConceptData(data))}
      resetPersistedData={() => dispatch(clearConceptData(undefined))}
    />
  )
}

export default Concept
