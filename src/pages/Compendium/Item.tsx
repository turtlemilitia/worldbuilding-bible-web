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

const Item: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, itemId } = useParams() as { compendiumId: string; itemId: string } // router

  const { item } = useAppSelector((state: RootState) => state.item) // redux

  const readyDataForRequest = (data: any): TItemRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={itemId}
      isNew={itemId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/items/${data.slug}`}
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={true}

      onFetch={() => viewItem(itemId).then(({ data }) => data.data)}
      onCreate={(data: TItemRequest) => storeItem(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TItemRequest) => updateItem(itemId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyItem(itemId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'items', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'items', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'items', id: itemId }))
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
