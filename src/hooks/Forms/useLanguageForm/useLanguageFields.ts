import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useLanguageDataManager, useNotebookDataManager } from '../../DataManagers'

const useLanguageFields = (): TUseFields => {

  const manager = useLanguageDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.language && notebook?.notes) {
    fields.push(
      noteField({
        options: notebook.notes,
      })
    )
  }

  return { fields, ready: true }
}

export default useLanguageFields
