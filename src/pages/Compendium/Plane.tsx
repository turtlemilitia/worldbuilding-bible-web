    import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storePlane, TPlaneRequest, updatePlane, viewPlane } from '../../services/PlaneService'
import { clearPlaneData, setPlaneData, updatePlaneData } from '../../reducers/compendium/plane/planeSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TPlane } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'

const Plane: FunctionComponent = (): JSX.Element => {

  const { plane } = useAppSelector((state: RootState) => state.plane) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, planeId } = useParams() as { compendiumId: string; planeId: string } // router

  const readyDataForRequest = (data: any): TPlaneRequest => ({
    name: data.name,
    content: data.content,
  })

  const fields: TFields[] = []

  return (
    <Post
      key={planeId}
      isNew={planeId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/planes/${data.slug}`}
      ready={true}

      onCreate={(data: TPlaneRequest) => storePlane(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TPlaneRequest) => updatePlane(planeId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'planes', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'planes', data: data }))
      }}
      onFetch={() => viewPlane(planeId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={plane as TPlane}
      setPersistedData={(data) => dispatch(setPlaneData(data))}
      updatePersistedData={(data) => dispatch(updatePlaneData(data))}
      resetPersistedData={() => dispatch(clearPlaneData(undefined))}
    />
  )
}

export default Plane
