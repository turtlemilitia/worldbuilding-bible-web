import { TCurrency } from '../../../types'
import { TCurrencyRequest } from '../../../services/ApiService/Compendia/CurrencyService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { useCurrencyDataManager } from '../../DataManagers'
import useCurrencyFields from '../useCurrencyForm/useCurrencyFields'
import { usePostForm } from '../index'

type TOwnProps = {
  currencyId: TCurrency['slug'];
}
const useCurrencyForm = ({
  currencyId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TCurrency>): TForm<TCurrency> => {

  const include = useMemo(() => 'notes', [])

  const manager = useCurrencyDataManager()

  const { fields } = useCurrencyFields()

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
    onDeleted
  })
}

export default useCurrencyForm
