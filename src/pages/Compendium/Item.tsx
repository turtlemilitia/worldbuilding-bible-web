import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import ContentWrapper from '../../components/ContentWrapper'
import Editor from '../../components/Forms/Fields/Editor'
import { storeItem, TItemRequest, updateItem, viewItem } from '../../services/ItemService'
import {
  clearItemData,
  setItemData,
  updateItemData
} from '../../reducers/compendium/item/itemSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'
import ItemInfoBar from './ItemInfoBar'
import ErrorBanner from '../../components/Banners/ErrorBanner'
import { setCompendiumData } from '../../reducers/compendium/compendiumSlice'

const Item: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, itemId } = useParams() as { compendiumId: string; itemId: string } // router

  const { item } = useAppSelector((state: RootState) => state.item) // redux

  const navigate = useNavigate()

  const initialState: any = {
    name: '',
    content: '',
  }

  const [loading, setLoading] = useState(false)
  const [infoBarReady, setInfoBarReady] = useState(true) // todo turn to false after implementing species
  const [error, setError] = useState<string>()
  const [data, setData] = useState(initialState)

  const isNew: boolean = itemId === 'new'

  const fetch = (): void => {
    setLoading(true)
    viewItem(itemId, { include: 'compendium' })
      .then(response => {
        setLoading(false)
        setData(response.data.data)
        dispatch(setItemData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (itemId && !isNew) {
      fetch()
    }
    if (isNew) {
      setData(initialState)
      dispatch(clearItemData(undefined))
    }
    return () => {
      dispatch(clearItemData(undefined))
    }
  }, [itemId])

  const validate = (): boolean => {
    if (!data.name || !data.content) {
      setError('Validation failed')
      return false
    }
    return true;
  }

  const readyDataForRequest = (data: any): TItemRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
    content: data.content,
  })

  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (!validate()) {
      return;
    }
    setLoading(true)
    const validated = readyDataForRequest(data);
    if (isNew) {
      storeItem(compendiumId, validated)
        .then(({ data }) => {
          setLoading(false)
          setData(data.data)
          dispatch(setItemData(data.data))
          dispatch(setCompendiumData({ 'hasItems': true }))
          // dispatch(addItem(data.data)) todo
          navigate(`/compendia/${compendiumId}/items/${data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateItem(itemId, validated)
        .then(response => {
          setLoading(false)
          setData(response.data.data)
          dispatch(updateItemData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }
  }

  return (
    <LoadingWrapper loading={loading || !infoBarReady}>
      <form onSubmit={submit}>
        <HeaderWrapper page="Item">
          <PageTitleField value={data.name}
                          onChange={(value) => setData((prevState: any) => ({ ...prevState, name: value }))}
                          placeholder={'Item Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-end -mx-3">
            <div className="w-full lg:w-1/4 px-3">
              <ItemInfoBar
                loading={loading || !infoBarReady}
                onChange={(key, value) => setData((prevState: any) => ({ ...prevState, [key]: value }))}
                setReady={setInfoBarReady}
                data={data}
              />
            </div>
            <div className="w-full lg:w-2/4 lg:ml-auto px-3">
              {error && <ErrorBanner errorText={error}/>}
              <FormToolbar onSave={submit} onRefresh={fetch}/>
              {!loading && <Editor
                value={data.content}
                onChange={(value) => setData((prevState: any) => ({ ...prevState, content: value }))}
                placeholder={'Write a simple description for the item.'}
              />}
            </div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
)
}

export default Item;
