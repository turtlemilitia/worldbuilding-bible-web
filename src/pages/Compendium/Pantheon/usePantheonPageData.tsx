import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TPantheon } from '../../../types'
import { setPantheonData, updatePantheonData } from '../../../reducers/compendium/pantheon/pantheonSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const usePantheonPageData = () => {

  const { compendiumId, pantheonId } = useParams() as { compendiumId: string; pantheonId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { pantheon: persistedData } = useAppSelector((state: RootState) => state.pantheon) // redux]

  const isNew: boolean = useMemo(() => pantheonId === 'new', [pantheonId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    pantheonId,
    persistedData,
    setPersistedData: (data?: TPantheon) => dispatch(setPantheonData(data)),
    updatePersistedData: (data: Partial<TPantheon>) => dispatch(updatePantheonData(data)),
    resetPersistedData: () => dispatch(setPantheonData(undefined)),
    onCreated: (data: TPantheon) => {
      dispatch(addCompendiumChildData({ field: 'pantheons', data: data }))
      navigate(`${compendiumPath}/pantheons/${persistedData?.slug}`)
    },
    onUpdated: (data: TPantheon) => {
      dispatch(updateCompendiumChildData({ field: 'pantheons', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'pantheons', id: pantheonId }))
      navigate(compendiumPath)
    },
  }

}

export default usePantheonPageData
