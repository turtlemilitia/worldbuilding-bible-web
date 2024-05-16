import useFields, { TField } from '../useFields'
import { TFaction, TCompendium, TNote } from '../../types'
import { TUseFields } from '../../components/Post/types'
import { indexCharacters } from '../../services/CharacterService'

type TProps = {
  compendium?: TCompendium,
  faction?: TFaction,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useFactionFields = ({ compendium, faction, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const { asyncMultiSelectField, noteField } = useFields()

  const fields: TField[] = []

  if (compendium) {
    asyncMultiSelectField({
      label: 'Characters',
      name: 'characters',
      search: (term: string) => indexCharacters(compendium.slug, { search: term })
        .then(response => response.data.data.map(location => ({
          id: location.id,
          slug: location.slug,
          name: location.name
        })))
    })
  }
  if (faction && compendium?.notebook) {
    fields.push(
      noteField({
        notableType: 'factions',
        notable: faction,
        notebookId: compendium?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready: true }
}

export default useFactionFields
