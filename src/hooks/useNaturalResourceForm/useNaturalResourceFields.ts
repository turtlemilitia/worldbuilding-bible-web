import useFields, { TField } from '../useFields'
import { TNaturalResource, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  compendium?: TCompendium,
  naturalResource?: TNaturalResource,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useNaturalResourceFields = ({ compendium, naturalResource, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const { noteField } = useFields()

  const fields: TField[] = []

  if (naturalResource && compendium?.notebook) {
    fields.push(
      noteField({
        notableType: 'naturalResources',
        notable: naturalResource,
        notebookId: compendium?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready: true }
}

export default useNaturalResourceFields
