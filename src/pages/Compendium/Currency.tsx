import React, { FunctionComponent, JSX } from 'react'
import { storeCurrency, TCurrencyRequest, updateCurrency, viewCurrency } from '../../services/CurrencyService'
import {
  clearCurrencyData,
  setCurrencyData,
  updateCurrencyData
} from '../../reducers/compendium/currency/currencySlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
import { TCurrency } from '../../types'

const Currency: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, currencyId } = useParams() as { compendiumId: string; currencyId: string } // router

  const { currency } = useAppSelector((state: RootState) => state.currency) // redux

  const navigate = useNavigate()

  const isNew: boolean = currencyId === 'new'

  const reset = () => dispatch(clearCurrencyData(undefined))

  const fetch = async () => {
    if (currencyId && !isNew) {
      await viewCurrency(currencyId, { include: 'compendium' })
        .then(response => {
          dispatch(setCurrencyData(response.data.data))
        })
    }
    if (isNew) {
      dispatch(clearCurrencyData(undefined))
    }
  }

  const readyDataForRequest = (data: any): TCurrencyRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TCurrency> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeCurrency(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setCurrencyData(data.data))
          dispatch(addCompendiumChildData({ field: 'currencies', data: data.data }))
          navigate(`/compendia/${compendiumId}/currencies/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateCurrency(currencyId, validated)
        .then(({ data }) => {
          dispatch(updateCurrencyData(data.data))
          dispatch(updateCompendiumChildData({ field: 'currencies', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={currencyId}
      initialValues={currency as TCurrency}
      onSubmit={submit}
      onFetch={fetch}
      fields={[]}
      ready={true}
      resetData={reset}
    />
  )
}

export default Currency
