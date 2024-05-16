import useFields, { TField } from '../useFields'
import { TPlane, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  compendium?: TCompendium,
  plane?: TPlane,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const usePlaneFields = ({ compendium, plane, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const { noteField } = useFields()

  const fields: TField[] = []

  if (plane && compendium?.notebook) {
    fields.push(
      noteField({
        notableType: 'planes',
        notable: plane,
        notebookId: compendium?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready: true }
}

export default usePlaneFields
