import { TUseFields } from "../../../components/Post/types"
import useUrlFormatter from '../../useUrlFormatter'
import { useCharacterDataManager, useNotebookDataManager } from '../../DataManagers'
import { factionField, languageField, noteField, numberField, selectField, textField, TField } from '../../fieldTools'

const useCharacterFields = (): TUseFields => {

  const manager = useCharacterDataManager()
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

  if (manager.character && manager.compendium?.notebook) {
    fields.push(
      noteField({
        options: notebook?.notes || [],
        link: (id: string | number) => `/notebooks/${notebook?.slug}/notes/${id}`,
      })
    )
  }

  return { fields, ready: true }
}

export default useCharacterFields
