import { noteField, selectField, TField } from '../../fieldTools'
import {TUseFields} from '@/components/Post/types';
import { useEncounterDataManager, useEncounterTypeIndexDataManager, useNoteIndexDataManager } from '../../DataManagers'
import { useMemo } from 'react'
import {
  characterField,
  datePickerField,
  locationField,
} from '@/hooks/fieldTools/fieldTools'
import { useCompendiumDataManager } from '@/hooks/DataManagers'

const useEncounterFields = (): TUseFields => {

  const manager = useEncounterDataManager()
  const { notes } = useNoteIndexDataManager()
  const { encounterTypes: types } = useEncounterTypeIndexDataManager();
  const { compendium } = useCompendiumDataManager();

  const fields: TField[] = useMemo(() => {
    const fields: TField[] = []
    if (types) {
      fields.push(selectField({
        name: 'type',
        label: 'Type',
        options: types,
        required: true
      }))
    }
    fields.push(datePickerField({
      name: 'completedAt',
      label: 'Completed'
    }))
    if (manager.encounter && compendium?.characters) {
      fields.push(
        characterField({
          options: compendium.characters,
        })
      )
    }
    if (manager.encounter && compendium?.locations) {
      fields.push(
        locationField({
          options: compendium.locations,
        })
      )
    }
    if (manager.encounter && notes) {
      fields.push(noteField({
        options: notes,
      }));
    }
    return fields;
  }, [manager.encounter, notes, types, compendium?.characters, compendium?.locations])

  return { fields }
}

export default useEncounterFields
