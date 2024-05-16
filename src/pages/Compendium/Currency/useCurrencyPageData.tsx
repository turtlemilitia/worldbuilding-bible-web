import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useUrlFormatter from '../../../hooks/useUrlFormatter'
import { useAppSelector } from '../../../hooks'
import { RootState } from '../../../store'
import { TCurrency } from '../../../types'
import { setCurrencyData, updateCurrencyData } from '../../../reducers/compendium/currency/currencySlice'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../../reducers/compendium/compendiumSlice'
import { useMemo } from 'react'

const useCurrencyPageData = () => {

  const { compendiumId, currencyId } = useParams() as { compendiumId: string; currencyId: string } // router
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { compendiumPath } = useUrlFormatter()

  const { currency: persistedData } = useAppSelector((state: RootState) => state.currency) // redux]

  const isNew: boolean = useMemo(() => currencyId === 'new', [currencyId])
  const canEdit: boolean = useMemo(() => isNew || persistedData?.canUpdate !== undefined, [isNew, persistedData?.canUpdate])

  return {
    isNew,
    canEdit,
    compendiumId,
    currencyId,
    persistedData,
    setPersistedData: (data?: TCurrency) => dispatch(setCurrencyData(data)),
    updatePersistedData: (data: Partial<TCurrency>) => dispatch(updateCurrencyData(data)),
    resetPersistedData: () => dispatch(setCurrencyData(undefined)),
    onCreated: (data: TCurrency) => {
      dispatch(addCompendiumChildData({ field: 'currencies', data: data }))
      navigate(`${compendiumPath}/currencies/${persistedData?.slug}`)
    },
    onUpdated: (data: TCurrency) => {
      dispatch(updateCompendiumChildData({ field: 'currencies', data: data }))
    },
    onDeleted: () => {
      dispatch(removeCompendiumChildData({ field: 'currencies', id: currencyId }))
      navigate(compendiumPath)
    },
  }

}

export default useCurrencyPageData
