import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import {
  useSceneDataManager,
  useNotebookDataManager,
  useCampaignDataManager, useCompendiumDataManager,
} from '../../DataManagers'
import { useMemo } from 'react'
import {
  characterField,
  encounterField,
  locationField,
} from '../../fieldTools/fieldTools'

const useSceneFields = (): TUseFields => {

  const { campaign } = useCampaignDataManager()
  const { compendium } = useCompendiumDataManager()
  const { notebook } = useNotebookDataManager()

  const manager = useSceneDataManager()

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
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
    if (manager.scene && notebook?.notes) {
      fields.push(
        noteField({
          options: notebook.notes,
        })
      )
    }
    return fields
  }, [manager.scene, campaign?.encounters, notebook?.notes, compendium?.characters, compendium?.locations])

  return { fields, ready: true }
}

export default useSceneFields
