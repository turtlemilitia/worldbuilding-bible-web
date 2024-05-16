import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TDeity } from '../../../types'
import { setDeityData, updateDeityData } from '../../../reducers/compendium/deity/deitySlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useDeityPageData = () => {

  const { compendiumId, deityId } = useParams() as { compendiumId: string; deityId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { deity: persistedData } = useAppSelector((state: RootState) => state.deity) // redux]

  const isNew: boolean = useMemo(() => deityId === 'new', [deityId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    deityId,
    persistedData,
    setPersistedData: (data?: TDeity) => dispatch(setDeityData(data)),
    updatePersistedData: (data: Partial<TDeity>) => dispatch(updateDeityData(data)),
    resetPersistedData: () => dispatch(setDeityData(undefined)),
    onCreated: (data: TDeity) => {
      dispatch(addCompendiumChildData({ field: 'deitys', data: data }))
      navigate(`${compendiumPath}/deitys/${persistedData?.slug}`)
    },
    onUpdated: (data: TDeity) => {
      dispatch(updateCompendiumChildData({ field: 'deitys', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'deitys', id: deityId }))
      navigate(compendiumPath)
    },
  }

}

export default useDeityPageData
