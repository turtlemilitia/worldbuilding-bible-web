import { TForm } from '../../components/Post/types'
import useFormHandling from '../useFormHandling'
import { TGenericPost } from '../../types'
import { TField } from '../fieldTools'
import { useEffect, useMemo } from 'react'
import useImageSelection from '../useImageSelection'
import {
  hasEncountersAttachableDataManager,
  hasImageableDataManager,
  hasNotesAttachableDataManager,
  hasQuestsAttachableDataManager,
  TDataManager
} from '../DataManagers'
import {
  hasFactionsAttachableDataManager,
  hasLanguagesAttachableDataManager,
  TOneOfAttachableNames
} from '../DataManagers/useAttachableDataManager'

type TProps<T, R> = {
  id: string | number,
  mapData: (payload: T) => R,
  include?: string,
  manager: TDataManager<T, R> & hasImageableDataManager
    & Partial<hasNotesAttachableDataManager & hasEncountersAttachableDataManager & hasQuestsAttachableDataManager & hasFactionsAttachableDataManager & hasLanguagesAttachableDataManager>
  fields?: TField[],
  onFetched?: (data: T) => any
  onCreated?: (data: T) => any
  onUpdated?: (data: T) => any
  onDeleted?: () => any
  canHaveProfileImage?: boolean
}
const usePostForm = <T extends TGenericPost, R> ({
  id,
  mapData,
  include = '',
  manager,
  fields = [],
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
  canHaveProfileImage
}: TProps<T, R>): TForm<T> => {

  const { entity, store, update, destroy, view } = manager

  const isNew = useMemo(() => id === 'new', [id])
  const canEdit = useMemo(() => isNew || entity?.canUpdate !== undefined, [isNew, entity?.canUpdate])

  const imageHandler = useImageSelection<T>({ manager, canHaveProfileImage })

  useEffect(() => {
    return () => {
      if (!manager.isPermanent) {
        manager.clearData(id)
      }
    }
  }, [id])

  const {
    loading,
    saving,

    data,
    setData,

    onFieldChange,
    onFetch,
    onSave,
    onDelete,

    errors
  } = useFormHandling({
    id,
    isNew,
    mapData,

    onFetch: () => view(id, { include: `${include ? `${include};` : ''}images` }),
    onCreate: (data: T) => store(mapData(data), { include }),
    onUpdate: (data: T) => update(id, mapData(data), { include }),
    onDelete: () => destroy(id),
    manyToManyFields: fields?.filter(({ type }) => ['multiSelect', 'asyncMultiSelect'].includes(type))
      .map(({ name }) => name as keyof T) || [],
    onAttach: async (name: keyof T, attachedId) => {
      debugger;
      switch (name as TOneOfAttachableNames) {
        case 'quests':
          return manager.quests?.attach(id, { questId: attachedId })
        case 'languages':
          return manager.languages?.attach(id, { languageId: attachedId })

        case 'notes':
          return manager.notes?.attach(id, { noteId: attachedId })

        case 'encounters':
          return manager.encounters?.attach(id, { encounterId: attachedId })

        case 'factions':
          return manager.factions?.attach(id, { factionId: attachedId })

      }
    },
    onDetach: async (name: keyof T, attachedId) => {
      debugger;
      return manager[name as TOneOfAttachableNames]?.detach(id, attachedId)
    },

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,

    persistedData: entity
  })

  return {
    isNew,
    canEdit,
    loading,
    saving,
    data,
    setData,
    onFieldChange,
    onFetch,
    onSave,
    onDelete,
    errors,
    fields,
    imageHandler
  }
}

export default usePostForm