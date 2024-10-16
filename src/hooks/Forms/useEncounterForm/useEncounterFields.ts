import { noteField, selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useEncounterDataManager, useEncounterTypeIndexDataManager, useNoteIndexDataManager } from '../../DataManagers'
import { useMemo } from 'react'

const useEncounterFields = (): TUseFields => {

  const manager = useEncounterDataManager()
  const { notes } = useNoteIndexDataManager()
  const { encounterTypes: types } = useEncounterTypeIndexDataManager();

  const fields: TField[] = useMemo(() => {
    debugger;
    const fields: TField[] = []
    if (types) {
      fields.push(selectField({
        name: 'type',
        label: 'Type',
        options: types,
        required: true
      }))
    }
    if (manager.encounter && notes) {
      fields.push(noteField({
        options: notes,
      }));
    }
    return fields;
  }, [manager.encounter, notes, types])

  return { fields }
}

export default useEncounterFields
