import { TCompendium, TLanguage } from '../../../types'
import { TLanguageRequest } from '../../../services/ApiService/Compendia/LanguageService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useLanguageDataManager } from '../../DataManagers'
import useLanguageFields from '../useLanguageForm/useLanguageFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  compendiumId?: TCompendium['id'];
  languageId?: TLanguage['id'];
}
const useLanguageForm = ({
  compendiumId,
  languageId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TLanguage>): TForm<TLanguage> => {

  const include = useMemo(() => 'notes', [])

  const manager = useLanguageDataManager(compendiumId, languageId)

  const { fields } = useLanguageFields(manager)

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
