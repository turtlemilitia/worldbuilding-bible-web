import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TItem } from '../../../types'
import { setItemData, updateItemData } from '../../../reducers/compendium/item/itemSlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useItemPageData = () => {

  const { compendiumId, itemId } = useParams() as { compendiumId: string; itemId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { item: persistedData } = useAppSelector((state: RootState) => state.item) // redux]

  const isNew: boolean = useMemo(() => itemId === 'new', [itemId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    itemId,
    persistedData,
    setPersistedData: (data?: TItem) => dispatch(setItemData(data)),
    updatePersistedData: (data: Partial<TItem>) => dispatch(updateItemData(data)),
    resetPersistedData: () => dispatch(setItemData(undefined)),
    onCreated: (data: TItem) => {
      dispatch(addCompendiumChildData({ field: 'items', data: data }))
      navigate(`${compendiumPath}/items/${data?.slug}`)
    },
    onUpdated: (data: TItem) => {
      dispatch(updateCompendiumChildData({ field: 'items', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'items', id: itemId }))
      navigate(compendiumPath)
    },
  }

}

export default useItemPageData
