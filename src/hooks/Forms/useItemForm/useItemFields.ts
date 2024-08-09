import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useItemDataManager, useNotebookDataManager } from '../../DataManagers'

const useItemFields = (): TUseFields => {

  const manager = useItemDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.item && manager.compendium?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useItemFields
