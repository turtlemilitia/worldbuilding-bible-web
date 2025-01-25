import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useMemo } from 'react'
import {
  TCurrencyDataManager,
  useCurrencyDataManager,
  useNoteIndexDataManager,
} from '@/hooks/DataManagers'

const useCurrencyFields = (manager: TCurrencyDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.currency && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [notes])

  return { fields }
}

export default useCurrencyFields
