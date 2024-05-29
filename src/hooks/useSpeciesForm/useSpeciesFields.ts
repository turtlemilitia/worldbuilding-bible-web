import useFields, { TField } from '../useFields'
import { TSpecies, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  compendium?: TCompendium,
  species?: TSpecies,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useSpeciesFields = ({ compendium, species, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const { noteField } = useFields()

  const fields: TField[] = []

  if (species && compendium?.notebook) {
    fields.push(
      noteField({
        notableType: 'species',
        notable: species,
        notebookId: compendium?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready: true }
}

export default useSpeciesFields
