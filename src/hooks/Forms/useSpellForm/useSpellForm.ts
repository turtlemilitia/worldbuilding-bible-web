import { TSpell } from '../../../types'
import { TSpellRequest } from '../../../services/ApiService/Compendia/SpellService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { usePostForm } from '../index'
import { useSpellDataManager } from '../../DataManagers'
import useSpellFields from '../useSpellForm/useSpellFields'

type TOwnProps = {
  spellId: TSpell['slug'];
}
const useSpellForm = ({
  spellId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TSpell>): TForm<TSpell> => {

  const include = useMemo(() => 'notes', [])

  const manager = useSpellDataManager()

  const { fields } = useSpellFields()

  const mapData = (data: any): TSpellRequest => ({
    name: data.name,
    content: data.content,
  })

  return usePostForm({
    id: spellId,
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

export default useSpellForm
