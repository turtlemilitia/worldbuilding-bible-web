import useFields, { TField } from '../useFields'
import { TLanguage, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  compendium?: TCompendium,
  language?: TLanguage,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useLanguageFields = ({ compendium, language, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const { noteField } = useFields()

  const fields: TField[] = []

  if (language && compendium?.notebook) {
    fields.push(
      noteField({
        notableType: 'languages',
        notable: language,
        notebookId: compendium?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready: true }
}

export default useLanguageFields
