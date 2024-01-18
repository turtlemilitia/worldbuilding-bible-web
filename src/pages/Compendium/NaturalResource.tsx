import React, { FunctionComponent, JSX } from 'react'
import { storeNaturalResource, TNaturalResourceRequest, updateNaturalResource, viewNaturalResource } from '../../services/NaturalResourceService'
import { clearNaturalResourceData, updateNaturalResourceData } from '../../reducers/compendium/naturalResource/naturalResourceSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TNaturalResource } from '../../types'
import Post from '../../components/Post/component'

const NaturalResource: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { naturalResource } = useAppSelector((state: RootState) => state.naturalResource) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, naturalResourceId } = useParams() as { compendiumId: string; naturalResourceId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = naturalResourceId === 'new'

  const readyDataForRequest = (data: any): TNaturalResourceRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TNaturalResource> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeNaturalResource(compendiumId, validated)
        .then(({ data }) => {
          dispatch(addCompendiumChildData({ field: 'naturalResources', data: data.data }))
          navigate(`/compendia/${compendiumId}/naturalResources/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateNaturalResource(naturalResourceId, validated)
        .then(({ data }) => {
          dispatch(updateCompendiumChildData({ field: 'naturalResources', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={naturalResourceId}
      isNew={isNew}
      remoteData={naturalResource as TNaturalResource}
      onSave={submit}
      onFetch={() => viewNaturalResource(naturalResourceId, { include: 'compendium' }).then(({ data }) => data.data)}
      fields={[]}
      ready={true}
      resetData={() => dispatch(clearNaturalResourceData(undefined))}
      setRemoteData={(data) => dispatch(updateNaturalResourceData(data))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default NaturalResource
