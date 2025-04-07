import { noteField, numberField, textField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import {
  TSessionDataManager,
  useNoteIndexDataManager,
  useSessionDataManager,
} from '../../DataManagers'
import {
  characterField,
  datePickerField,
  encounterField,
  locationField,
  questField,
  sceneField,
} from '../../fieldTools/fieldTools'
import { useMemo } from 'react'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

const useSessionFields = (manager: TSessionDataManager): TUseFields => {

  const { notes } = useNoteIndexDataManager()
  const { compendium } = useCurrentCompendium()

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

    if (manager.session && manager.campaign) {
      fields.push(
        encounterField({
          options: manager.campaign.encounters || [],
        }),
        // sceneField({
        //   options: manager.campaign.scenes || [],
        // }),
        questField({
          options: manager.campaign.quests || [],
        }),
      )
    }

    if (manager.session && compendium) {
      fields.push(
        locationField({
          options: compendium.locations || []
        }),
        characterField({
          options: compendium.characters || []
        })
      )
    }

    if (manager.session && notes) {
      fields.push(
        noteField({
          options: notes || [],
        })
      )
    }

    return fields
  }, [manager.campaign, manager.session, compendium, notes])

  return { fields }
}

export default useSessionFields
