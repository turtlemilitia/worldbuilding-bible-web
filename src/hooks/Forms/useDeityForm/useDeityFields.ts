import { noteField, selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TDeityDataManager,
  useDeityDataManager,
  useNoteIndexDataManager,
} from '../../DataManagers'
import { useMemo } from 'react'

const useDeityFields = (manager: TDeityDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.compendium) {
      fields.push(selectField({
        name: 'pantheon',
        label: 'Pantheon',
        options: manager.compendium.pantheons ?? []
      }))
    }
    if (manager.deity && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.deity, notes])

  return { fields }
}

export default useDeityFields
