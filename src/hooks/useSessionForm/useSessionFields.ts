import useFields, { TField } from '../useFields'
import { TSession, TCampaign, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";

type TProps = {
  campaign?: TCampaign,
  session?: TSession,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useSessionFields = ({ campaign, session, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const { numberField, textField, noteField } = useFields()

  const fields: TField[] = [
    numberField({
      name: 'session_number',
      label: 'Session number',
      required: true
    }),
    textField({
      name: 'scheduled_at',
      label: 'Scheduled at',
      required: true
    }),
    numberField({
      name: 'duration',
      label: 'Duration (hours)',
    }),
    textField({
      name: 'location',
      label: 'Location',
    })
  ]

  if (session && campaign?.notebook) {
    fields.push(
      noteField({
        notableType: 'sessions',
        notable: session,
        notebookId: campaign?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready: true }
}

export default useSessionFields
