    import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storePlane, TPlaneRequest, updatePlane, viewPlane } from '../../services/PlaneService'
import { clearPlaneData, setPlaneData, updatePlaneData } from '../../reducers/compendium/plane/planeSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TPlane, TLocationType } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'
import { indexSpecies } from '../../services/SpeciesService'

const Plane: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { plane } = useAppSelector((state: RootState) => state.plane) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, planeId } = useParams() as { compendiumId: string; planeId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = planeId === 'new'

  const reset = () => dispatch(clearPlaneData(undefined));

  const fetch = async () => {
    if (planeId && !isNew) {
      await viewPlane(planeId, { include: 'compendium' })
        .then(response => {
          dispatch(setPlaneData(response.data.data))
        })
    }
    if (isNew) {
      reset()
    }
  }

  useEffect(() => {
    if (planeId && !isNew) {
      fetch()
    }
    if (isNew) {
      dispatch(clearPlaneData(undefined))
    }
    return () => {
      dispatch(clearPlaneData(undefined))
    }
  }, [planeId])

  const readyDataForRequest = (data: any): TPlaneRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TPlane> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storePlane(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setPlaneData(data.data))
          dispatch(addCompendiumChildData({ field: 'planes', data: data.data }))
          navigate(`/compendia/${compendiumId}/planes/${data.data.slug}`)
          return data.data
        })
    } else {
      return updatePlane(planeId, validated)
        .then(({ data }) => {
          dispatch(updatePlaneData(data.data))
          dispatch(updateCompendiumChildData({ field: 'planes', data: data.data }))
          return data.data
        })
    }
  }

  const fields: TFields[] = []

  return (
    <Post
      key={planeId}
      ready={true}
      initialValues={plane as TPlane}
      onSubmit={submit}
      onFetch={fetch}
      fields={fields}
      resetData={reset}
    />
  )
}

export default Plane
