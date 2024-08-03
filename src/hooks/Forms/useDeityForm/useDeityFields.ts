import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useDeityDataManager, useNotebookDataManager } from '../../DataManagers'

const useDeityFields = (): TUseFields => {

  const manager = useDeityDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.deity && manager.compendium?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useDeityFields
