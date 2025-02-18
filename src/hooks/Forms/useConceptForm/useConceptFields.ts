import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TConceptDataManager,
  useConceptDataManager,
  useNoteIndexDataManager,
} from '../../DataManagers'
import { useMemo } from 'react'

const useConceptFields = (manager: TConceptDataManager): TUseFields => {

  const { concept } = manager;
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (concept && notes) {
      fields.push(noteField({
        options: notes,
      }));
    }
    return fields;
  }, [concept, notes])

  return { fields }
}

export default useConceptFields
