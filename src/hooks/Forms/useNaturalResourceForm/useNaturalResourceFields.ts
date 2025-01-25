import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TNaturalResourceDataManager,
  useNaturalResourceDataManager,
  useNoteIndexDataManager,
} from '../../DataManagers'
import { useMemo } from 'react'

const useNaturalResourceFields = (manager: TNaturalResourceDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.naturalResource && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.naturalResource, notes])

  return { fields }
}

export default useNaturalResourceFields
