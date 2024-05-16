import {TCompendium, TSpell} from '../../types'
import {
  destroySpell,
  storeSpell,
  TSpellRequest, updateSpell,
  viewSpell
} from '../../services/SpellService'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
  spellId: TSpell['slug'];
}
const useSpellForm = ({
  compendiumId,
  spellId,
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TSpell>): TUseForm<TSpell> => {

  const include = useMemo(() => '', [])

  const mapData = (data: any): TSpellRequest => ({
    name: data.name,
    content: data.content,
  })

  const onFetch = () => viewSpell(spellId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TSpell): Promise<TSpell> => storeSpell(compendiumId, mapData(data), { include }).then((response) => response.data.data)

  const onUpdate = (data: TSpellRequest) => updateSpell(spellId, mapData(data)).then(({data}) => data.data)

  const onDelete = () => destroySpell(spellId);

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

export default useSpellForm;
