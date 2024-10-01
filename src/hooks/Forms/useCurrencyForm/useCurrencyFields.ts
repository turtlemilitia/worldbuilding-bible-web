import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useCurrencyDataManager, useNotebookDataManager } from '../../DataManagers'

const useCurrencyFields = (): TUseFields => {

  const manager = useCurrencyDataManager()
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = []

  if (manager.currency && notebook?.notes) {
    fields.push(
      noteField({
        options: notebook.notes,
      })
    )
  }

  return { fields }
}

export default useCurrencyFields
