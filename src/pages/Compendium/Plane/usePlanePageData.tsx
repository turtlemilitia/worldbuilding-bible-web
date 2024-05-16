import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TPlane } from '../../../types'
import { setPlaneData, updatePlaneData } from '../../../reducers/compendium/plane/planeSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const usePlanePageData = () => {

  const { compendiumId, planeId } = useParams() as { compendiumId: string; planeId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { plane: persistedData } = useAppSelector((state: RootState) => state.plane) // redux]

  const isNew: boolean = useMemo(() => planeId === 'new', [planeId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    planeId,
    persistedData,
    setPersistedData: (data?: TPlane) => dispatch(setPlaneData(data)),
    updatePersistedData: (data: Partial<TPlane>) => dispatch(updatePlaneData(data)),
    resetPersistedData: () => dispatch(setPlaneData(undefined)),
    onCreated: (data: TPlane) => {
      dispatch(addCompendiumChildData({ field: 'planes', data: data }))
      navigate(`${compendiumPath}/planes/${persistedData?.slug}`)
    },
    onUpdated: (data: TPlane) => {
      dispatch(updateCompendiumChildData({ field: 'planes', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'planes', id: planeId }))
      navigate(compendiumPath)
    },
  }

}

export default usePlanePageData
