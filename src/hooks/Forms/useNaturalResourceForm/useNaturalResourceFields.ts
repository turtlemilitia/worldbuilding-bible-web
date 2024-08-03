import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useNaturalResourceDataManager, useNotebookDataManager } from '../../DataManagers'

const useNaturalResourceFields = (): TUseFields => {

  const manager = useNaturalResourceDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.naturalResource && manager.compendium?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useNaturalResourceFields
