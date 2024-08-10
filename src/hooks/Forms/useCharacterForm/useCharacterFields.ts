import { TUseFields } from '../../../components/Post/types'
import useUrlFormatter from '../../useUrlFormatter'
import { useCampaignDataManager, useCharacterDataManager, useNotebookDataManager } from '../../DataManagers'
import { factionField, languageField, noteField, numberField, selectField, textField, TField } from '../../fieldTools'
import { encounterField, questField } from '../../fieldTools/fieldTools'

const useCharacterFields = (): TUseFields => {

  const manager = useCharacterDataManager()
  const { campaign } = useCampaignDataManager()
  const { notebook } = useNotebookDataManager()

  const { compendiumPath } = useUrlFormatter()

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
      })
    )
  }

  if (manager.character && campaign) {
    fields.push(
      questField({
        options: campaign?.quests || [],
        link: (id: string | number) => `/campaigns/${campaign?.slug}/quests/${id}`,
      }),
      encounterField({
        options: campaign?.encounters || [],
        link: (id: string | number) => `/campaigns/${campaign?.slug}/encounters/${id}`,
      }),
      // sessionField({
      //   options: campaign?.sessions || [],
      //   link: (id: string | number) => `/campaigns/${campaign?.slug}/sessions/${id}`,
      // })
    )
  }

  if (manager.character && notebook?.notes) {
    fields.push(
      noteField({
        options: notebook.notes,
      })
    )
  }

  return { fields, ready: true }
}

export default useCharacterFields
