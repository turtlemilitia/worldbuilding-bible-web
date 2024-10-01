import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useItemDataManager, useNoteIndexDataManager, } from '../../DataManagers'

const useItemFields = (): TUseFields => {

  const manager = useItemDataManager()
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = []

  if (manager.item && notes) {
    fields.push(
      noteField({
        options: notes,
      })
    )
  }

  return { fields }
}

export default useItemFields
