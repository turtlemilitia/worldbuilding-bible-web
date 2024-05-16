import useFields, { TField } from '../useFields'
import { TCurrency, TCompendium, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  compendium?: TCompendium,
  currency?: TCurrency,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useCurrencyFields = ({ compendium, currency, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const { noteField } = useFields()

  const fields: TField[] = []

  if (currency && compendium?.notebook) {
    fields.push(
      noteField({
        notableType: 'currencys',
        notable: currency,
        notebookId: compendium?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready: true }
}

export default useCurrencyFields
