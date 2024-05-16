import {TCompendium, TPantheon} from '../../types'
import {
  destroyPantheon,
  storePantheon,
  TPantheonRequest, updatePantheon,
  viewPantheon
} from '../../services/PantheonService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  pantheonId: TPantheon['slug'];
}
const usePantheonForm = ({
  compendiumId,
  pantheonId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TPantheon>): TUseForm<TPantheon> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TPantheonRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewPantheon(pantheonId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TPantheon): Promise<TPantheon> => storePantheon(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TPantheonRequest) => updatePantheon(pantheonId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroyPantheon(pantheonId);

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

export default usePantheonForm;
