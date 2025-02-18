import { useMemo } from 'react'
import { noteField, selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useNoteIndexDataManager, TPantheonDataManager } from '@/hooks/DataManagers'

const usePantheonFields = (manager : TPantheonDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.compendium) {
      fields.push(selectField({
        name: 'religion',
        label: 'Religion',
        options: manager.compendium.religions ?? []
      }))
    }
    if (manager.pantheon && notes) {
      fields.push(noteField({
        options: notes,
      }));
    }
    return fields;
  }, [notes])

  return { fields }
}

export default usePantheonFields
