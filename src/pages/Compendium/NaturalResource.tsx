import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storeNaturalResource, TNaturalResourceRequest, updateNaturalResource, viewNaturalResource } from '../../services/NaturalResourceService'
import { clearNaturalResourceData, setNaturalResourceData, updateNaturalResourceData } from '../../reducers/compendium/naturalResource/naturalResourceSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TNaturalResource, TLocationType } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'
import { indexSpecies } from '../../services/SpeciesService'

const NaturalResource: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { naturalResource } = useAppSelector((state: RootState) => state.naturalResource) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, naturalResourceId } = useParams() as { compendiumId: string; naturalResourceId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = naturalResourceId === 'new'

  const reset = () => dispatch(clearNaturalResourceData(undefined));

  const fetch = async () => {
    if (naturalResourceId && !isNew) {
      await viewNaturalResource(naturalResourceId, { include: 'compendium' })
        .then(response => {
          dispatch(setNaturalResourceData(response.data.data))
        })
    }
    if (isNew) {
      reset()
    }
  }

  useEffect(() => {
    if (naturalResourceId && !isNew) {
      fetch()
    }
    if (isNew) {
      dispatch(clearNaturalResourceData(undefined))
    }
    return () => {
      dispatch(clearNaturalResourceData(undefined))
    }
  }, [naturalResourceId])

  const readyDataForRequest = (data: any): TNaturalResourceRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TNaturalResource> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeNaturalResource(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setNaturalResourceData(data.data))
          dispatch(addCompendiumChildData({ field: 'naturalResources', data: data.data }))
          navigate(`/compendia/${compendiumId}/naturalResources/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateNaturalResource(naturalResourceId, validated)
        .then(({ data }) => {
          dispatch(updateNaturalResourceData(data.data))
          dispatch(updateCompendiumChildData({ field: 'naturalResources', data: data.data }))
          return data.data
        })
    }
  }

  const fields: TFields[] = []

  return (
    <Post
      key={naturalResourceId}
      ready={true}
      initialValues={naturalResource as TNaturalResource}
      onSubmit={submit}
      onFetch={fetch}
      fields={fields}
      resetData={reset}
    />
  )
}

export default NaturalResource
