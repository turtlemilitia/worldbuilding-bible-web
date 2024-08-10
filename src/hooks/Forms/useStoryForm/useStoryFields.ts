import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useNotebookDataManager, useStoryDataManager } from '../../DataManagers'

const useStoryFields = (): TUseFields => {

  const manager = useStoryDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.story && notebook?.notes) {
    fields.push(
      noteField({
        options: notebook.notes,
      })
    )
  }

  return { fields, ready: true }
}

export default useStoryFields
