import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useContext, useEffect, useState } from 'react'
import { EncounterWrapperContext } from '../../../components/EncounterWrapper/component'
import { useEncounterDataManager, useNotebookDataManager } from '../../DataManagers'

const useEncounterFields = (): TUseFields => {

  const { notebook } = useNotebookDataManager()
  const types = useContext(EncounterWrapperContext);

  const [ready, setReady] = useState<boolean>(false)
  const manager = useEncounterDataManager()

  useEffect(() => {

    if (types !== undefined) {
      setReady(true)
    }

  }, [types])

  const fields: TField[] = []

  if (manager.encounter && manager.campaign?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready }
}

export default useEncounterFields
