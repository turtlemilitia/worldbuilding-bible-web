import React, { FunctionComponent, JSX } from 'react'
import { destroyItem, storeItem, TItemRequest, updateItem, viewItem } from '../../services/ItemService'
import {
  clearItemData,
  setItemData,
  updateItemData
} from '../../reducers/compendium/item/itemSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
import { TItem } from '../../types'
import useUrlFormatter from '../../hooks/useUrlFormatter'

const Item: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate();

  const { compendiumId, itemId } = useParams() as { compendiumId: string; itemId: string } // router

  const { item } = useAppSelector((state: RootState) => state.item) // redux

  const {compendiumPath} = useUrlFormatter()

  const readyDataForRequest = (data: any): TItemRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={itemId}
      isNew={itemId === 'new'}
      pageTypeName={'Item'}
      canEdit={item.canUpdate}
      canDelete={item.canDelete}
      ready={true}

      onFetch={() => viewItem(itemId).then(({ data }) => data.data)}
      onCreate={(data: TItemRequest) => storeItem(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TItemRequest) => updateItem(itemId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyItem(itemId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'items', data: data }))
        navigate(`${compendiumPath}/items/${data.slug}`)
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'items', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'items', id: itemId }))
        navigate(compendiumPath)
      }}

      fields={[]}

      persistedData={item as TItem}
      setPersistedData={(data) => dispatch(setItemData(data))}
      updatePersistedData={(data) => dispatch(updateItemData(data))}
      resetPersistedData={() => dispatch(clearItemData(undefined))}
    />
  )
}

export default Item
