import { noteField, TField } from '../../fieldTools'
import { TUseFields } from '@/components/Post/types'
import {
  TFactionDataManager,
  useFactionDataManager,
  useNoteIndexDataManager,
} from '../../DataManagers'
import { multiSelectField } from '../../fieldTools/fieldTools'
import { useMemo } from 'react'

const useFactionFields = (manager: TFactionDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.compendium) {
      fields.push(multiSelectField({
        label: 'Characters',
        name: 'characters',
        options: manager.compendium?.characters || [],
      }));
    }
    if (manager.faction && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.faction, manager.compendium, notes])

  return { fields }
}

export default useFactionFields
