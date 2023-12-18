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

  const navigate = useNavigate()

  const isNew: boolean = itemId === 'new'

  const reset = () => dispatch(clearItemData(undefined))

  const fetch = async () => {
    if (itemId && !isNew) {
      await viewItem(itemId, { include: 'compendium' })
        .then(response => {
          dispatch(setItemData(response.data.data))
        })
    }
    if (isNew) {
      dispatch(clearItemData(undefined))
    }
  }

  const readyDataForRequest = (data: any): TItemRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TItem> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeItem(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setItemData(data.data))
          dispatch(addCompendiumChildData({ field: 'factions', data: data.data }))
          navigate(`/compendia/${compendiumId}/items/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateItem(itemId, validated)
        .then(({ data }) => {
          dispatch(updateItemData(data.data))
          dispatch(updateCompendiumChildData({ field: 'items', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={itemId}
      initialValues={item as TItem}
      name={item.name || ''}
      onSubmit={submit}
      onFetch={fetch}
      fields={[]}
      ready={true}
      resetData={reset}
    />
  )
}

export default Item
