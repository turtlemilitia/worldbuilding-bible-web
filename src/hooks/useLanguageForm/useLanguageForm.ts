import {TCompendium, TLanguage} from '../../types'
import {
  destroyLanguage,
  storeLanguage,
  TLanguageRequest, updateLanguage,
  viewLanguage
} from '../../services/LanguageService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  languageId: TLanguage['slug'];
}
const useLanguageForm = ({
  compendiumId,
  languageId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TLanguage>): TUseForm<TLanguage> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TLanguageRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewLanguage(languageId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TLanguage): Promise<TLanguage> => storeLanguage(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TLanguageRequest) => updateLanguage(languageId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyLanguage(languageId);

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

export default useLanguageForm;
