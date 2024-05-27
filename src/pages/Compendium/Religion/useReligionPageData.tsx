import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TReligion } from '../../../types'
import { setReligionData, updateReligionData } from '../../../reducers/compendium/religion/religionSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useReligionPageData = () => {

  const { compendiumId, religionId } = useParams() as { compendiumId: string; religionId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { religion: persistedData } = useAppSelector((state: RootState) => state.religion) // redux]

  const isNew: boolean = useMemo(() => religionId === 'new', [religionId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    religionId,
    persistedData,
    setPersistedData: (data?: TReligion) => dispatch(setReligionData(data)),
    updatePersistedData: (data: Partial<TReligion>) => dispatch(updateReligionData(data)),
    resetPersistedData: () => dispatch(setReligionData(undefined)),
    onCreated: (data: TReligion) => {
      dispatch(addCompendiumChildData({ field: 'religions', data: data }))
      navigate(`${compendiumPath}/religions/${data?.slug}`)
    },
    onUpdated: (data: TReligion) => {
      dispatch(updateCompendiumChildData({ field: 'religions', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'religions', id: religionId }))
      navigate(compendiumPath)
    },
  }

}

export default useReligionPageData
