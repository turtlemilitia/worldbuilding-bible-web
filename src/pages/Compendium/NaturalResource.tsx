import React, { FunctionComponent, JSX } from 'react'
import {
  destroyNaturalResource,
  storeNaturalResource,
  TNaturalResourceRequest,
  updateNaturalResource,
  viewNaturalResource
} from '../../services/NaturalResourceService'
import {
  clearNaturalResourceData,
  setNaturalResourceData,
  updateNaturalResourceData
} from '../../reducers/compendium/naturalResource/naturalResourceSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TNaturalResource } from '../../types'
import Post from '../../components/Post'
import useUrlFormatter from '../../utils/hooks/useUrlFormatter'

const NaturalResource: FunctionComponent = (): JSX.Element => {

  const { naturalResource } = useAppSelector((state: RootState) => state.naturalResource) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, naturalResourceId } = useParams() as { compendiumId: string; naturalResourceId: string } // router

  const {compendiumPath} = useUrlFormatter()

  const readyDataForRequest = (data: any): TNaturalResourceRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={naturalResourceId}
      isNew={naturalResourceId === 'new'}
      pageTypeName={'Natural Resource'}
      pathToNew={(data) => `${compendiumPath}/naturalResources/${data.slug}`}
      pathAfterDelete={compendiumPath}
      canEdit={naturalResource.canUpdate}
      canDelete={naturalResource.canDelete}
      ready={true}

      onFetch={() => viewNaturalResource(naturalResourceId).then(({ data }) => data.data)}
      onCreate={(data: TNaturalResourceRequest) => storeNaturalResource(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TNaturalResourceRequest) => updateNaturalResource(naturalResourceId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyNaturalResource(naturalResourceId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'naturalResources', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'naturalResources', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'naturalResources', id: naturalResourceId }))
      }}

      fields={[]}

      persistedData={naturalResource as TNaturalResource}
      setPersistedData={(data) => dispatch(setNaturalResourceData(data))}
      updatePersistedData={(data) => dispatch(updateNaturalResourceData(data))}
      resetPersistedData={() => dispatch(clearNaturalResourceData(undefined))}
    />
  )
}

export default NaturalResource
