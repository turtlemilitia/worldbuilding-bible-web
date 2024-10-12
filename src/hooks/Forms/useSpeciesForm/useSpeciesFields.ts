import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useNoteIndexDataManager, useSpeciesDataManager } from '../../DataManagers'
import { useMemo } from 'react'

const useSpeciesFields = (): TUseFields => {

  const manager = useSpeciesDataManager()
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.species && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.species, notes])

  return { fields }
}

export default useSpeciesFields
