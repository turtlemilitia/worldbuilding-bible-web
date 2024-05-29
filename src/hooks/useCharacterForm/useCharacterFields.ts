import useFields, { TField } from '../useFields'
import { indexLanguages } from '../../services/LanguageService'
import { indexFactions } from '../../services/FactionService'
import { TCharacter, TCompendium, TNote, TSpecies } from '../../types'
import { useEffect, useState } from 'react'
import { indexSpecies } from '../../services/SpeciesService'
import useUrlFormatter from '../useUrlFormatter'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  compendium?: TCompendium,
  character?: TCharacter,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useCharacterFields = ({ compendium, character, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const [ready, setReady] = useState<boolean>(false)
  const [species, setSpecies] = useState<TSpecies[]>([])

  const { compendiumPath } = useUrlFormatter()

  /**
   * TODO get species from redux
   */
  useEffect(() => {
    if (species.length) {
      setReady(true)
    }
  }, [species])

  useEffect(() => {
    if (compendium?.slug) {
      indexSpecies(compendium.slug).then(response => setSpecies(response.data.data))
    }
  }, [compendium?.slug])

  const {
    textField,
    numberField,
    selectField,
    asyncMultiSelectField,
    noteField
  } = useFields()

  const fields: TField[] = [
    numberField({ name: 'age', label: 'Age' }),
    textField({ name: 'gender', label: 'Gender' }),
    selectField({ name: 'species', label: 'Species', options: species }),
  ]

  if (compendium) {
    fields.push(
      asyncMultiSelectField({
        name: 'languages',
        label: 'Languages',
        search: (term: string) => indexLanguages(compendium.slug, { search: term }).then(res => res.data.data),
        link: (id: string | number) => `${compendiumPath}/languages/${id}`,
      }),
      asyncMultiSelectField({
        name: 'factions',
        label: 'Factions',
        search: (term: string) => indexFactions(compendium.slug, { search: term }).then(res => res.data.data),
        link: (id: string | number) => `${compendiumPath}/factions/${id}`,
      })
    )
  }

  if (character && compendium?.notebook) {
    fields.push(
      noteField({
        notableType: 'characters',
        notable: character,
        notebookId: compendium?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready }
}

export default useCharacterFields
