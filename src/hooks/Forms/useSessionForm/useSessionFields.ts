import { noteField, numberField, textField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import { useNotebookDataManager, useSessionDataManager } from '../../DataManagers'
import {
  datePickerField,
  encounterField,
  questField,
  sceneField,
} from '../../fieldTools/fieldTools'

const useSessionFields = (): TUseFields => {

  const manager = useSessionDataManager();
  const { notebook } = useNotebookDataManager()

  const fields: TField[] = [
    numberField({
      name: 'session_number',
      label: 'Session number',
      required: true
    }),
    datePickerField({
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

  if (manager.session && manager.campaign) {
    fields.push(
      sceneField({
        options: manager.campaign.scenes || [],
      }),
      questField({
        options: manager.campaign.quests || [],
      }),
      encounterField({
        options: manager.campaign.encounters || [],
      }),
    )
  }

  return { fields }
}

export default useSessionFields
