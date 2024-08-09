import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useNotebookDataManager, useReligionDataManager } from '../../DataManagers'

const useReligionFields = (): TUseFields => {

  const manager = useReligionDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.religion && manager.compendium?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useReligionFields
