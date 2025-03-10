import { TForm, TUseFormProps } from '@/components/Post/types'
import { TCompendium } from '@/types'
import { useCompendiumDataManager } from '../../DataManagers'
import { usePostForm } from '../index'
import { useCallback, useMemo } from 'react'
import useCompendiumFields from './useCompendiumFields'
import useLink from '@/hooks/useLink'

export const compendiumIncludes = 'creator;notes;characters;concepts;currencies;deities;deities.pantheon;factions;items;languages;locations;locations.parent;naturalResources;pantheons;pantheons.religion;planes;religions;species;spells;stories';

type TOwnProps = {
  compendiumId?: TCompendium['id'];
}
const useCompendiumForm = ({
  compendiumId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TCompendium>): TForm<TCompendium> => {

  const manager = useCompendiumDataManager(compendiumId)

  const { fields } = useCompendiumFields(manager)

  const include = useMemo(() => `${compendiumIncludes};images`, [])

  const mapData = useCallback((data: TCompendium) => ({
    name: data.name,
    content: data.content,
  }), [])

  return usePostForm({
    fetchOnMount: false, // it's fetched in the Wrapper
    id: compendiumId,
    mapData,
    include,
    manager,
    fields,
    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: useLink('compendia', compendiumId)
  })
}

export default useCompendiumForm
