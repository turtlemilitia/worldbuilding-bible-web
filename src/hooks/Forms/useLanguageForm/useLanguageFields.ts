import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useLanguageDataManager, useNoteIndexDataManager } from '../../DataManagers'
import { useMemo } from 'react'

const useLanguageFields = (): TUseFields => {

  const manager = useLanguageDataManager()
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.language && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.language, notes])

  return { fields }
}

export default useLanguageFields
