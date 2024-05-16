import useFields, { TField } from '../useFields'
import { TLocation, TCompendium, TNote, TLocationType, TLocationGovernmentType } from '../../types'
import { TUseFields } from '../../components/Post/types'
import { useEffect, useMemo, useState } from 'react'
import { indexLocationTypes } from '../../services/LocationTypeService'
import { indexGovernmentTypes } from '../../services/GovernmentTypeService'
import { indexLocations } from '../../services/LocationService'

type TProps = {
  compendium?: TCompendium,
  location?: TLocation,
  onNoteCreated?: (note: TNote) => any,
  onNoteUpdated?: (note: TNote) => any,
}

const useLocationFields = ({ compendium, location, onNoteCreated, onNoteUpdated }: TProps): TUseFields => {

  const { noteField } = useFields()

  const [ready, setReady] = useState<boolean>(false)
  const [locationTypes, setLocationTypes] = useState<TLocationType[]>()
  const [governmentTypes, setGovernmentTypes] = useState<TLocationGovernmentType[]>()

  useEffect(() => {

    if (locationTypes !== undefined && governmentTypes !== undefined) {
      setReady(true)
    }

  }, [locationTypes, governmentTypes])

  useEffect(() => {

    indexLocationTypes().then(response => setLocationTypes(response.data.data))
    indexGovernmentTypes().then(response => setGovernmentTypes(response.data.data))

  }, [])

  const fields = useMemo(() => {
    const fields: TField[] = [
      {
        name: 'aliases',
        label: 'Aliases',
        type: 'text' // todo this is supposed to be a select-create
      },
      {
        name: 'type',
        label: 'Type',
        type: 'select',
        options: locationTypes ?? []
      },
      {
        name: 'demonym',
        label: 'Demonym',
        type: 'text'
      },
      {
        name: 'population',
        label: 'Population',
        type: 'text'
      },
      {
        name: 'governmentType',
        label: 'Government',
        type: 'select',
        options: governmentTypes ?? []
      }
    ]

    if (compendium && location) {
      fields.push(
        {
          name: 'parent',
          label: 'Parent Location',
          type: 'asyncSelect',
          search: (term: string) => indexLocations(compendium.slug, { search: term })
            .then(response => response.data.data.map(location => ({
              id: location.id,
              slug: location.slug,
              name: location.name
            })))
        },
        {
          name: 'children',
          label: 'Child Locations',
          type: 'asyncMultiSelect',
          link: (id: string | number) => `/compendia/${compendium.slug}/locations/${location.children?.find((child: TLocation) => child.id === id)?.slug || ''}`,
          search: (term: string) => indexLocations(compendium.slug, { search: term })
            .then(response => response.data.data.map(location => ({
              id: location.id,
              slug: location.slug,
              name: location.name
            })))
        }
      )
    }

    if (location && compendium?.notebook) {
      fields.push(
        noteField({
          notableType: 'locations',
          notable: location,
          notebookId: compendium?.notebook.slug,
          onCreated: onNoteCreated,
          onUpdated: onNoteUpdated
        })
      )
    }

    return fields;
  }, [compendium, location]);

  return { fields, ready }
}

export default useLocationFields
