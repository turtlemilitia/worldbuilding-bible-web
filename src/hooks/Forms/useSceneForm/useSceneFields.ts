import { noteField, TField } from '../../fieldTools'
import {TUseFields} from "../../../components/Post/types";
import {
  useSceneDataManager,
  useNotebookDataManager,
  useCampaignDataManager
} from '../../DataManagers'
import { useMemo } from 'react'
import { encounterField } from '../../fieldTools/fieldTools'

const useSceneFields = (): TUseFields => {

  const { campaign } = useCampaignDataManager()
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
    if (manager.scene && notebook?.notes) {
      fields.push(
        noteField({
          options: notebook.notes,
        })
      )
    }
    return fields
  }, [manager.scene, campaign?.encounters, notebook?.notes])

  return { fields, ready: true }
}

export default useSceneFields
