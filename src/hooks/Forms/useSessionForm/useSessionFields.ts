import { noteField, numberField, textField, TField } from '../../fieldTools'
import { TSession, TCampaign, TNote } from '../../../types'
import {TUseFields} from "../../../components/Post/types";
import { useNotebookDataManager, useSessionDataManager } from '../../DataManagers'

const useSessionFields = (): TUseFields => {

  const manager = useSessionDataManager();
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = [
    numberField({
      name: 'session_number',
      label: 'Session number',
      required: true
    }),
    textField({
      name: 'scheduled_at',
      label: 'Scheduled at',
      required: true
    }),
    numberField({
      name: 'duration',
      label: 'Duration (hours)',
    }),
    textField({
      name: 'location',
      label: 'Location',
    })
  ]

  if (manager.session && manager.campaign?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
      })
    )
  }

  return { fields, ready: true }
}

export default useSessionFields
