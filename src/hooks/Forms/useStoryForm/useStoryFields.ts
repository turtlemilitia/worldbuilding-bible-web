import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useNoteIndexDataManager, useStoryDataManager } from '../../DataManagers'
import { useMemo } from 'react'

const useStoryFields = (): TUseFields => {

  const manager = useStoryDataManager()
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (manager.story && notes) {
      fields.push(noteField({
        options: notes || [],
      }));
    }
    return fields;
  }, [manager.story, notes])

  return { fields }
}

export default useStoryFields
