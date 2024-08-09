import { noteField, selectField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useEncounterDataManager, useEncounterTypeIndexDataManager, useNotebookDataManager } from '../../DataManagers'

const useEncounterFields = (): TUseFields => {

  const { notebook } = useNotebookDataManager()
  const { encounterTypes: types } = useEncounterTypeIndexDataManager();

  const manager = useEncounterDataManager()

  const fields: TField[] = [
    selectField({
      name: 'type',
      label: 'Type',
      options: types || [],
    })
  ]

  if (manager.encounter && manager.campaign?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useEncounterFields