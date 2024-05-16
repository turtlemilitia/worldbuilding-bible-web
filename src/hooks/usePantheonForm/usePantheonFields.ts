import useFields, { TField } from '../useFields'
import { TPantheon, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  compendium?: TCompendium,
  pantheon?: TPantheon,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const usePantheonFields = ({ compendium, pantheon, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const { noteField } = useFields()

  const fields: TField[] = []

  if (pantheon && compendium?.notebook) {
    fields.push(
      noteField({
        notableType: 'pantheons',
        notable: pantheon,
        notebookId: compendium?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready: true }
}

export default usePantheonFields
