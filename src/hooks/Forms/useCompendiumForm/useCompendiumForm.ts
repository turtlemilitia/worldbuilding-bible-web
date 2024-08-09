import { TForm, TUseFormProps } from '../../../components/Post/types'
import { TCompendium } from '../../../types'
import { useCompendiumDataManager } from '../../DataManagers'
import { usePostForm } from '../index'
import { useCallback, useMemo } from 'react'
import useCompendiumFields from './useCompendiumFields'

type TOwnProps = {
  compendiumId: TCompendium['slug'];
}
const useCompendiumForm = ({
  compendiumId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TCompendium>): TForm<TCompendium> => {

  const manager = useCompendiumDataManager()

  const { fields } = useCompendiumFields()

  const include = useMemo(() => 'characters;concepts;currencies;deities;factions;items;languages;locations;locations.parent;naturalResources;pantheons;planes;religions;species;spells;stories', [])

  const mapData = useCallback((data: TCompendium) => ({
    name: data.name,
    content: data.content
  }), [])

  return usePostForm({
    id: compendiumId,
    mapData,
    include,
    manager,
    fields,
    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
  })
}

export default useCompendiumForm