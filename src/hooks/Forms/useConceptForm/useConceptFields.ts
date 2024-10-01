import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useConceptDataManager, useNotebookDataManager } from '../../DataManagers'

const useConceptFields = (): TUseFields => {

  const manager = useConceptDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.concept && manager.compendium?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields }
}

export default useConceptFields
