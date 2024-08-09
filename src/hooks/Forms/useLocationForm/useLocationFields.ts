import { noteField, selectField, textField, TField } from '../../fieldTools'
import { TLocation } from '../../../types'
import { TUseFields } from '../../../components/Post/types'
import { useMemo } from 'react'
import {
  useGovernmentTypeIndexDataManager,
  useLocationDataManager,
  useLocationTypeIndexDataManager,
  useNotebookDataManager
} from '../../DataManagers'
import { multiSelectField } from '../../fieldTools/fieldTools'
import useUrlFormatter from '../../useUrlFormatter'

const useLocationFields = (): TUseFields => {

  const manager = useLocationDataManager()
  const { notebook } = useNotebookDataManager()
  const { locationTypes } = useLocationTypeIndexDataManager()
  const { governmentTypes } = useGovernmentTypeIndexDataManager()
  const { compendiumPath } = useUrlFormatter()

  const fields = useMemo(() => {
    const fields: TField[] = [
      textField({
        name: 'aliases',
        label: 'Aliases',
      }),
      selectField({
        name: 'type',
        label: 'Type',
        required: true,
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
            link: (id: string | number) => `${compendiumPath}/locations/${manager.location?.children?.find((child: TLocation) => child.slug === id)?.slug || ''}`,
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

  return { fields, ready: true }
}

export default useLocationFields
