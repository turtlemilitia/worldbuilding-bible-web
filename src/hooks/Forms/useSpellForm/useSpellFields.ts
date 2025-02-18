import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TSpellDataManager,
  useNoteIndexDataManager,
  useSpellDataManager,
} from '../../DataManagers'
import { useMemo } from 'react'

const useSpellFields = (manager: TSpellDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.spell && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.spell, notes])

  return { fields }
}

export default useSpellFields
