import {TCompendium, TCurrency} from '../../types'
import {
  destroyCurrency,
  storeCurrency,
  TCurrencyRequest, updateCurrency,
  viewCurrency
} from '../../services/CurrencyService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  currencyId: TCurrency['slug'];
}
const useCurrencyForm = ({
  compendiumId,
  currencyId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TCurrency>): TUseForm<TCurrency> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TCurrencyRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewCurrency(currencyId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TCurrency): Promise<TCurrency> => storeCurrency(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TCurrencyRequest) => updateCurrency(currencyId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyCurrency(currencyId);

  return useFormHandling({
    isNew,
    mapData,

    // API
    onFetch,
    onCreate,
    onUpdate,
    onDelete,
    onFetched,
    onCreated,
    onUpdated,
    onDeleted,

    // persisted data
    persistedData,
    setPersistedData,
    updatePersistedData,
    resetPersistedData
  })
}

export default useCurrencyForm;
