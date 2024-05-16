import useFields, { TField } from '../useFields'
import { TEncounter, TCampaign, TNote } from '../../types'
import {TUseFields} from "../../components/Post/types";
import { useContext, useEffect, useState } from 'react'
import { EncounterWrapperContext } from '../../components/EncounterWrapper/component'

type TProps = {
  campaign?: TCampaign,
  encounter?: TEncounter,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useEncounterFields = ({ campaign, encounter, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const types = useContext(EncounterWrapperContext);

  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {

    if (types !== undefined) {
      setReady(true)
    }

  }, [types])
  const { noteField } = useFields()

  const fields: TField[] = []

  if (encounter && campaign?.notebook) {
    fields.push(
      noteField({
        notableType: 'encounters',
        notable: encounter,
        notebookId: campaign?.notebook.slug,
        onCreated: onNoteCreated,
        onUpdated: onNoteUpdated
      })
    )
  }

  return { fields, ready }
}

export default useEncounterFields
