import { useMemo } from 'react'
import { noteField, selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { usePantheonDataManager, useNoteIndexDataManager } from '@/hooks/DataManagers'

const usePantheonFields = (): TUseFields => {

  const manager = usePantheonDataManager()
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
