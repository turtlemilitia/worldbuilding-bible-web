import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useConceptDataManager, useNoteIndexDataManager } from '../../DataManagers'
import { useMemo } from 'react'

const useConceptFields = (): TUseFields => {

  const manager = useConceptDataManager()
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.concept && notes) {
      fields.push(noteField({
        options: notes,
      }));
    }
    return fields;
  }, [manager.concept, notes])

  return { fields }
}

export default useConceptFields
