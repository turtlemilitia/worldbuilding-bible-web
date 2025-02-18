import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TItemDataManager,
  useItemDataManager,
  useNoteIndexDataManager,
} from '../../DataManagers'
import { useMemo } from 'react'

const useItemFields = (manager: TItemDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.item && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.item, notes])

  return { fields }
}

export default useItemFields
