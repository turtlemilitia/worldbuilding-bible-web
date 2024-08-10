import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useNotebookDataManager, useSpeciesDataManager } from '../../DataManagers'

const useSpeciesFields = (): TUseFields => {

  const manager = useSpeciesDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.species && notebook?.notes) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useSpeciesFields
