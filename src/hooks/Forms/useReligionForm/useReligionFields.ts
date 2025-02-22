import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TReligionDataManager,
  useNoteIndexDataManager,
  useReligionDataManager,
} from '../../DataManagers'
import { useMemo } from 'react'

const useReligionFields = (manager: TReligionDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.religion && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.religion, notes])

  return { fields }
}

export default useReligionFields
