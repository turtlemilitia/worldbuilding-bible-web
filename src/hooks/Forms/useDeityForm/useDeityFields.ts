import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useDeityDataManager, useNotebookDataManager } from '../../DataManagers'

const useDeityFields = (): TUseFields => {

  const manager = useDeityDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.deity && notebook?.notes) {
    fields.push(
      noteField({
        options: notebook.notes,
      })
    )
  }

  return { fields }
}

export default useDeityFields
