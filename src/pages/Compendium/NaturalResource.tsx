import React, { FunctionComponent, JSX } from 'react'
import { storeNaturalResource, TNaturalResourceRequest, updateNaturalResource, viewNaturalResource } from '../../services/NaturalResourceService'
import {
  clearNaturalResourceData,
  setNaturalResourceData,
  updateNaturalResourceData
} from '../../reducers/compendium/naturalResource/naturalResourceSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TNaturalResource } from '../../types'
import Post from '../../components/Post'

const NaturalResource: FunctionComponent = (): JSX.Element => {

  const { naturalResource } = useAppSelector((state: RootState) => state.naturalResource) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, naturalResourceId } = useParams() as { compendiumId: string; naturalResourceId: string } // router

  const readyDataForRequest = (data: any): TNaturalResourceRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={naturalResourceId}
      isNew={naturalResourceId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/naturalResources/${data.slug}`}
      ready={true}

      onCreate={(data: TNaturalResourceRequest) => storeNaturalResource(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TNaturalResourceRequest) => updateNaturalResource(naturalResourceId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'naturalResources', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'naturalResources', data: data }))
      }}
      onFetch={() => viewNaturalResource(naturalResourceId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={naturalResource as TNaturalResource}
      setPersistedData={(data) => dispatch(setNaturalResourceData(data))}
      updatePersistedData={(data) => dispatch(updateNaturalResourceData(data))}
      resetPersistedData={() => dispatch(clearNaturalResourceData(undefined))}
    />
  )
}

export default NaturalResource
