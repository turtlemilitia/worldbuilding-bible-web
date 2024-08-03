import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useNotebookDataManager, usePantheonDataManager } from '../../DataManagers'

const usePantheonFields = (): TUseFields => {

  const manager = usePantheonDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.pantheon && manager.compendium?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default usePantheonFields
