import { useMemo } from 'react'
import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TCompendiumDataManager,
  useNoteIndexDataManager,
} from '@/hooks/DataManagers'

const useCompendiumFields = (manager: TCompendiumDataManager): TUseFields => {

  const {notes} = useNoteIndexDataManager()

  const fields = useMemo(() => {
    const fields: TField[] = [];
    if (notes) {
      fields.push(
        noteField({
          options: notes,
        })
      )
    }
    return fields;
  }, [notes]);

  return { fields }
}

export default useCompendiumFields
