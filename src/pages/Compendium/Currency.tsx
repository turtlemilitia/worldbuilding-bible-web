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
import Post from '../../components/Post'
import { TCurrency } from '../../types'

const Currency: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, currencyId } = useParams() as { compendiumId: string; currencyId: string } // router

  const { currency } = useAppSelector((state: RootState) => state.currency) // redux

  const readyDataForRequest = (data: any): TCurrencyRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={currencyId}
      isNew={currencyId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/currencies/${data.slug}`}
      ready={true}

      onCreate={(data: TCurrencyRequest) => storeCurrency(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TCurrencyRequest) => updateCurrency(currencyId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'currencies', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'currencies', data: data }))
      }}
      onFetch={() => viewCurrency(currencyId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={currency as TCurrency}
      setPersistedData={(data) => dispatch(setCurrencyData(data))}
      updatePersistedData={(data) => dispatch(updateCurrencyData(data))}
      resetPersistedData={() => dispatch(clearCurrencyData(undefined))}
    />
  )
}

export default Currency
