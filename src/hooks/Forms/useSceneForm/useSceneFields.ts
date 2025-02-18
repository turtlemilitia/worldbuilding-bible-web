import { noteField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useNoteIndexDataManager,
  TSceneDataManager,
} from '@/hooks/DataManagers'
import { useMemo } from 'react'
import {
  characterField, datePickerField,
  encounterField,
  locationField,
} from '../../fieldTools/fieldTools'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

const useSceneFields = (manager: TSceneDataManager): TUseFields => {

  const { campaign } = manager;
  const { compendium } = useCurrentCompendium()
  const { notes } = useNoteIndexDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = [
      datePickerField({
        name: 'completedAt',
        label: 'Completed'
      })
    ]
    if (manager.scene && campaign?.encounters) {
      fields.push(
        encounterField({
          options: campaign.encounters,
        })
      )
    }
    if (manager.scene && compendium?.characters) {
      fields.push(
        characterField({
          options: compendium.characters,
        })
      )
    }
    if (manager.scene && compendium?.locations) {
      fields.push(
        locationField({
          options: compendium.locations,
        })
      )
    }
    if (manager.scene && notes) {
      fields.push(
        noteField({
          options: notes,
        })
      )
    }
    return fields
  }, [manager.scene, campaign?.encounters, notes, compendium?.characters, compendium?.locations])

  return { fields }
}

export default useSceneFields
