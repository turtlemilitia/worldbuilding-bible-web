import { useState } from 'react'
import { TUseFields } from "../../../components/Post/types"
import { TSpecies } from '../../../types'
import useUrlFormatter from '../../useUrlFormatter'
import { useCharacterDataManager, useNotebookDataManager } from '../../DataManagers'
import { factionField, languageField, noteField, numberField, selectField, textField, TField } from '../../fieldTools'

const useCharacterFields = (): TUseFields => {

  const manager = useCharacterDataManager()
  const { notebook } = useNotebookDataManager()

  const [ready, setReady] = useState<boolean>(false)
  const [species, setSpecies] = useState<TSpecies[]>([])

  const { compendiumPath } = useUrlFormatter()

  const fields: TField[] = [
    numberField({ name: 'age', label: 'Age' }),
    textField({ name: 'gender', label: 'Gender' }),
    selectField({ name: 'species', label: 'Species', options: species }),
  ]

  if (manager.compendium) {
    fields.push(
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

  return { fields, ready }
}

export default useCharacterFields
