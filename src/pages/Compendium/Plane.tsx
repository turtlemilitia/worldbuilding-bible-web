import React, { FunctionComponent, JSX } from 'react'
import { destroyPlane, storePlane, TPlaneRequest, updatePlane, viewPlane } from '../../services/PlaneService'
import { clearPlaneData, setPlaneData, updatePlaneData } from '../../reducers/compendium/plane/planeSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TPlane } from '../../types'
import Post from '../../components/Post'
import { TField } from '../../hooks/useFields'
import useUrlFormatter from '../../hooks/useUrlFormatter'

const Plane: FunctionComponent = (): JSX.Element => {

  const { plane } = useAppSelector((state: RootState) => state.plane) // redux

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate();

  const { compendiumId, planeId } = useParams() as { compendiumId: string; planeId: string } // router

  const {compendiumPath} = useUrlFormatter()

  const readyDataForRequest = (data: any): TPlaneRequest => ({
    name: data.name,
    content: data.content,
  })

  const fields: TField[] = []

  return (
    <Post
      key={planeId}
      isNew={planeId === 'new'}
      pageTypeName={'Plane'}
      canEdit={plane.canUpdate}
      canDelete={plane.canDelete}
      ready={true}

      onFetch={() => viewPlane(planeId).then(({ data }) => data.data)}
      onCreate={(data: TPlaneRequest) => storePlane(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TPlaneRequest) => updatePlane(planeId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyPlane(planeId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'planes', data: data }))
        navigate(`${compendiumPath}/planes/${data.slug}`)
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'planes', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'planes', id: planeId }))
        navigate(compendiumPath)
      }}

      fields={[]}

      persistedData={plane as TPlane}
      setPersistedData={(data) => dispatch(setPlaneData(data))}
      updatePersistedData={(data) => dispatch(updatePlaneData(data))}
      resetPersistedData={() => dispatch(clearPlaneData(undefined))}
    />
  )
}

export default Plane
