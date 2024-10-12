import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { usePlaneDataManager, useNoteIndexDataManager } from '../../DataManagers'
import { useMemo } from 'react'

const usePlaneFields = (): TUseFields => {

  const manager = usePlaneDataManager()
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.plane && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.plane, notes])

  return { fields }
}

export default usePlaneFields
