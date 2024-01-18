import React, { FunctionComponent, JSX } from 'react'
import { storeItem, TItemRequest, updateItem, viewItem } from '../../services/ItemService'
import {
  clearItemData,
  setItemData,
  updateItemData
} from '../../reducers/compendium/item/itemSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
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
      ready={true}

      onCreate={(data: TItemRequest) => storeItem(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TItemRequest) => updateItem(itemId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'items', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'items', data: data }))
      }}
      onFetch={() => viewItem(itemId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={item as TItem}
      setPersistedData={(data) => dispatch(setItemData(data))}
      updatePersistedData={(data) => dispatch(updateItemData(data))}
      resetPersistedData={() => dispatch(clearItemData(undefined))}
    />
  )
}

export default Item
