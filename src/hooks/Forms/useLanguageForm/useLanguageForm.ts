import { TLanguage } from '../../../types'
import { TLanguageRequest } from '../../../services/ApiService/Compendia/LanguageService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useLanguageDataManager } from '../../DataManagers'
import useLanguageFields from '../useLanguageForm/useLanguageFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  languageId: TLanguage['slug'];
}
const useLanguageForm = ({
  languageId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TLanguage>): TForm<TLanguage> => {

  const include = useMemo(() => 'notes', [])

  const manager = useLanguageDataManager()

  const { fields } = useLanguageFields()

  const mapData = (data: any): TLanguageRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: languageId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('languages', languageId)
  })
}

export default useLanguageForm
