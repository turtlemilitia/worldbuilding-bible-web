import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TStoryDataManager,
  useNoteIndexDataManager,
  useStoryDataManager,
} from '../../DataManagers'
import { useMemo } from 'react'

const useStoryFields = (manager: TStoryDataManager): TUseFields => {

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
