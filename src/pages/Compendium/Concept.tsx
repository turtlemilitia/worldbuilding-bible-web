import React, { FunctionComponent, JSX } from 'react'
import {
  destroyConcept,
  storeConcept,
  TConceptRequest,
  updateConcept,
  viewConcept
} from '../../services/ConceptService'
import {
  clearConceptData,
  setConceptData,
  updateConceptData
} from '../../reducers/compendium/concept/conceptSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
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
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={true}

      onFetch={() => viewConcept(conceptId).then(({ data }) => data.data)}
      onCreate={(data: TConceptRequest) => storeConcept(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TConceptRequest) => updateConcept(conceptId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyConcept(conceptId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'concepts', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'concepts', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'concepts', id: conceptId }))
      }}

      fields={[]}

      persistedData={concept as TConcept}
      setPersistedData={(data) => dispatch(setConceptData(data))}
      updatePersistedData={(data) => dispatch(updateConceptData(data))}
      resetPersistedData={() => dispatch(clearConceptData(undefined))}
    />
  )
}

export default Concept
