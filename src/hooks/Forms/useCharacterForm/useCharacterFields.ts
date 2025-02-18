import { TUseFields } from '@/components/Post/types'
import useUrlFormatter from '../../useUrlFormatter'
import {
  TCharacterDataManager,
  useNoteIndexDataManager,
} from '../../DataManagers'
import { factionField, languageField, noteField, numberField, selectField, textField, TField } from '../../fieldTools'
import {encounterField, locationField, questField, sceneField} from '../../fieldTools/fieldTools'
import { useMemo } from 'react'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

const useCharacterFields = (manager: TCharacterDataManager): TUseFields => {

  const { campaign } = useCurrentCampaign()
  const { notes } = useNoteIndexDataManager()

  const { compendiumPath } = useUrlFormatter()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = [
      numberField({ name: 'age', label: 'Age' }),
      textField({ name: 'gender', label: 'Gender' }),
    ]

    if (manager.compendium) {
      fields.push(
        selectField({
          name: 'species',
          label: 'Species',
          options: manager.compendium.species || [],
          required: true
        }),
        languageField({
          options: manager.compendium.languages || [],
          link: (id: string | number) => `${compendiumPath}/languages/${id}`,
        }),
        factionField({
          options: manager.compendium.factions || [],
          link: (id: string | number) => `${compendiumPath}/factions/${id}`,
        }),
        locationField({
          options: manager.compendium.locations || [],
          link: (id: string | number) => `${compendiumPath}/locations/${id}`,
        })
      )
    }

    if (manager.character && campaign) {
      fields.push(
        sceneField({
          options: campaign?.scenes || [],
          link: (id: string | number) => `/campaigns/${campaign?.id}/${campaign?.slug}/scenes/${id}`,
        }),
        questField({
          options: campaign?.quests || [],
          link: (id: string | number) => `/campaigns/${campaign?.id}/${campaign?.slug}/quests/${id}`,
        }),
        encounterField({
          options: campaign?.encounters || [],
          link: (id: string | number) => `/campaigns/${campaign?.id}/${campaign?.slug}/encounters/${id}`,
        }),
      )
    }

    if (manager.character && notes) {
      fields.push(
        noteField({
          options: notes,
        })
      )
    }
    return fields
  }, [manager.compendium, manager.character, campaign?.quests, campaign?.encounters, campaign?.scenes, notes])

  return { fields }
}

export default useCharacterFields
