import { noteField, numberField, textField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useNoteIndexDataManager, useSessionDataManager } from '../../DataManagers'
import {
  datePickerField,
  encounterField,
  questField,
  sceneField,
} from '../../fieldTools/fieldTools'
import { useMemo } from 'react'

const useSessionFields = (): TUseFields => {

  const manager = useSessionDataManager();
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
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

    if (manager.session && notes) {
      fields.push(
        noteField({
          options: notes || [],
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
    return fields
  }, [manager.campaign, manager.session, notes])

  return { fields }
}

export default useSessionFields
