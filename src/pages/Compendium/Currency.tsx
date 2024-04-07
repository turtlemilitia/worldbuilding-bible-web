import React, { FunctionComponent, JSX } from 'react'
import {
  destroyCurrency,
  storeCurrency,
  TCurrencyRequest,
  updateCurrency,
  viewCurrency
} from '../../services/CurrencyService'
import {
  clearCurrencyData,
  setCurrencyData,
  updateCurrencyData
} from '../../reducers/compendium/currency/currencySlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
import { TCurrency } from '../../types'
import useUrlFormatter from '../../utils/hooks/useUrlFormatter'

const Currency: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, currencyId } = useParams() as { compendiumId: string; currencyId: string } // router

  const { currency } = useAppSelector((state: RootState) => state.currency) // redux

  const {compendiumPath} = useUrlFormatter()

  const readyDataForRequest = (data: any): TCurrencyRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={currencyId}
      isNew={currencyId === 'new'}
      pageTypeName={'Currency'}
      pathToNew={(data) => `${compendiumPath}/currencies/${data.slug}`}
      pathAfterDelete={compendiumPath}
      canEdit={currency.canUpdate}
      canDelete={currency.canDelete}
      ready={true}

      onFetch={() => viewCurrency(currencyId).then(({ data }) => data.data)}
      onCreate={(data: TCurrencyRequest) => storeCurrency(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TCurrencyRequest) => updateCurrency(currencyId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyCurrency(currencyId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'currencies', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'currencies', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'currencies', id: currencyId }))
      }}

      fields={[]}

      persistedData={currency as TCurrency}
      setPersistedData={(data) => dispatch(setCurrencyData(data))}
      updatePersistedData={(data) => dispatch(updateCurrencyData(data))}
      resetPersistedData={() => dispatch(clearCurrencyData(undefined))}
    />
  )
}

export default Currency
