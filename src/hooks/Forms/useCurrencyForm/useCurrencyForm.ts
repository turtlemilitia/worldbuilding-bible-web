import { TCompendium, TCurrency } from '../../../types'
import { TCurrencyRequest } from '../../../services/ApiService/Compendia/CurrencyService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { useCurrencyDataManager } from '../../DataManagers'
import useCurrencyFields from '../useCurrencyForm/useCurrencyFields'
import { usePostForm } from '../index'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  currencyId?: TCurrency['id'];
}
const useCurrencyForm = ({
  compendiumId,
  currencyId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TCurrency>): TForm<TCurrency> => {

  const include = useMemo(() => 'notes', [])

  const manager = useCurrencyDataManager(compendiumId, currencyId)

  const { fields } = useCurrencyFields(manager)

  const mapData = (data: any): TCurrencyRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: currencyId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('currencies', currencyId)
  })
}

export default useCurrencyForm
