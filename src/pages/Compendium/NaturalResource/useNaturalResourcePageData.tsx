import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TNaturalResource } from '../../../types'
import { setNaturalResourceData, updateNaturalResourceData } from '../../../reducers/compendium/naturalResource/naturalResourceSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useNaturalResourcePageData = () => {

  const { compendiumId, naturalResourceId } = useParams() as { compendiumId: string; naturalResourceId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { naturalResource: persistedData } = useAppSelector((state: RootState) => state.naturalResource) // redux]

  const isNew: boolean = useMemo(() => naturalResourceId === 'new', [naturalResourceId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    naturalResourceId,
    persistedData,
    setPersistedData: (data?: TNaturalResource) => dispatch(setNaturalResourceData(data)),
    updatePersistedData: (data: Partial<TNaturalResource>) => dispatch(updateNaturalResourceData(data)),
    resetPersistedData: () => dispatch(setNaturalResourceData(undefined)),
    onCreated: (data: TNaturalResource) => {
      dispatch(addCompendiumChildData({ field: 'naturalResources', data: data }))
      navigate(`${compendiumPath}/naturalResources/${persistedData?.slug}`)
    },
    onUpdated: (data: TNaturalResource) => {
      dispatch(updateCompendiumChildData({ field: 'naturalResources', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'naturalResources', id: naturalResourceId }))
      navigate(compendiumPath)
    },
  }

}

export default useNaturalResourcePageData
