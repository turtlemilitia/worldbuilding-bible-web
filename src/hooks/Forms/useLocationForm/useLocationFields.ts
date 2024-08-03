import { noteField, selectField, textField, TField } from '../../fieldTools'
import { TLocation } from '../../../types'
import { TUseFields } from '../../../components/Post/types'
import { useMemo, useState } from 'react'
import {
  useGovernmentTypeIndexDataManager,
  useLocationDataManager,
  useLocationTypeIndexDataManager,
  useNotebookDataManager
} from '../../DataManagers'
import { multiSelectField } from '../../fieldTools/fieldTools'

const useLocationFields = (): TUseFields => {

  const manager = useLocationDataManager()
  const { notebook } = useNotebookDataManager()
  const { locationTypes } = useLocationTypeIndexDataManager()
  const { governmentTypes } = useGovernmentTypeIndexDataManager()

  const [ready, setReady] = useState<boolean>(false)

  const fields = useMemo(() => {
    const fields: TField[] = [
      textField({
        name: 'aliases',
        label: 'Aliases',
      }),
      selectField({
        name: 'type',
        label: 'Type',
        options: locationTypes ?? []
      }),
      textField({
        name: 'demonym',
        label: 'Demonym'
      }),
      textField({
        name: 'population',
        label: 'Population',
      }),
      selectField({
        name: 'governmentType',
        label: 'Government',
        options: governmentTypes ?? []
      })
    ]

    if (manager.compendium) {
      fields.push(
        selectField({
          name: 'parent',
          label: 'Parent Location',
          options: manager.compendium.locations || []
        })
      )
      if (manager.location) {
        fields.push(
          multiSelectField({
            name: 'children',
            label: 'Child Locations',
            options: manager.compendium.locations || [],
            link: (id: string | number) => `/compendia/${manager.compendium?.slug}/locations/${manager.location?.children?.find((child: TLocation) => child.id === id)?.slug || ''}`,
          })
        )
      }
    }

    if (manager.location && manager.compendium?.notebook) {
      fields.push(
        noteField({
          options: notebook?.notes || [],
        })
      )
    }

    return fields
  }, [manager.compendium, manager.location, locationTypes, governmentTypes])

  return { fields, ready }
}

export default useLocationFields
