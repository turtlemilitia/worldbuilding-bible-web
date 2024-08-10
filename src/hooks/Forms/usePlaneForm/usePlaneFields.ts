import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useNotebookDataManager, usePlaneDataManager } from '../../DataManagers'

const usePlaneFields = (): TUseFields => {

  const manager = usePlaneDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.plane && notebook?.notes) {
    fields.push(
      noteField({
        options: notebook.notes,
      })
    )
  }

  return { fields, ready: true }
}

export default usePlaneFields
