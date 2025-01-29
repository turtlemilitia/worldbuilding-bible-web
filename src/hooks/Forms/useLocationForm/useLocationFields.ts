import { noteField, selectField, textField, TField } from '../../fieldTools'
import { TLocation } from '@/types'
import { TUseFields } from '@/components/Post/types'
import { useMemo } from 'react'
import {
  TLocationDataManager,
  useGovernmentTypeIndexDataManager,
  useLocationTypeIndexDataManager,
  useNoteIndexDataManager,
} from '@/hooks/DataManagers'
import {characterField, encounterField, multiSelectField, questField, sceneField} from '../../fieldTools/fieldTools'
import useUrlFormatter from '../../useUrlFormatter'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

const useLocationFields = (manager: TLocationDataManager): TUseFields => {

  const { campaign } = useCurrentCampaign()
  const { notes } = useNoteIndexDataManager()
  const { locationTypes } = useLocationTypeIndexDataManager()
  const { governmentTypes } = useGovernmentTypeIndexDataManager()
  const { compendiumPath } = useUrlFormatter()

  const fields = useMemo(() => {
    const fields: TField[] = [
      textField({
        name: 'aliases',
        label: 'Aliases',
      }),
      selectField({
        name: 'type',
        label: 'Type',
        required: true,
        options: locationTypes ?? []
      }),
      textField({
        name: 'demonym',
        label: 'Demonym'
      }),
      textField({
        name: 'population',
        label: 'Population',
      }),
      selectField({
        name: 'governmentType',
        label: 'Government',
        options: governmentTypes ?? []
      })
    ]

    if (manager.compendium) {
      fields.push(
        selectField({
          name: 'parent',
          label: 'Parent Location',
          options: manager.compendium.locations || []
        })
      )
      if (manager.location) {
        fields.push(
          multiSelectField({
            name: 'children',
            label: 'Child Locations',
            options: manager.compendium.locations || [],
            link: (id: string | number) => {
              const location = manager.location?.children?.find((child: TLocation) => child.id === id)
              return `${compendiumPath}/locations/${location?.id || ''}/${location?.slug || ''}`
            },
          })
        )
      }
      fields.push(
          characterField({
            options: manager.compendium.characters || []
          })
      )
    }

    if (manager.location && campaign) {
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

    if (manager.location && notes) {
      fields.push(
        noteField({
          options: notes,
        })
      )
    }

    return fields
  }, [manager.compendium, manager.location, campaign?.quests, campaign?.encounters, campaign?.scenes, locationTypes, governmentTypes, notes])

  return { fields }
}

export default useLocationFields
