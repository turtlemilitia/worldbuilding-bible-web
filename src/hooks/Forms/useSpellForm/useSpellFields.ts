import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useNotebookDataManager, useSpellDataManager } from '../../DataManagers'

const useSpellFields = (): TUseFields => {

  const manager = useSpellDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.spell && manager.compendium?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useSpellFields
