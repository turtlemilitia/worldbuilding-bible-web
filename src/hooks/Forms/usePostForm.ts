import { TForm } from '@/components/Post/types'
import useFormHandling from '../useFormHandling'
import { TGenericPost } from '@/types'
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
  hasCharactersAttachableDataManager,
  hasFactionsAttachableDataManager,
  hasFavouritesAttachableDataManager,
  hasLanguagesAttachableDataManager,
  hasPermissionsAttachableDataManager,
  hasPinsAttachableDataManager,
  hasScenesAttachableDataManager,
  hasLocationsAttachableDataManager,
  TOneOfAttachableNames
} from '../DataManagers/useAttachableDataManager'
import usePinHandler from '../usePinHandler'
import useFavouriteHandler from '../useFavouriteHandler'
import useUserPermissionHandler from '../useUserPermissionHandler'

type TProps<T, R> = {
  fetchOnMount?: boolean,
  id: string | number,
  mapData: (payload: T) => R,
  include?: string,
  manager: TDataManager<T, R> & hasImageableDataManager
    & Partial<hasNotesAttachableDataManager & hasEncountersAttachableDataManager & hasQuestsAttachableDataManager & hasFactionsAttachableDataManager & hasLanguagesAttachableDataManager & hasCharactersAttachableDataManager & hasFavouritesAttachableDataManager & hasPinsAttachableDataManager & hasScenesAttachableDataManager & hasPermissionsAttachableDataManager & hasLocationsAttachableDataManager>
  fields?: TField[],
  onFetched?: (data: T) => any
  onCreated?: (data: T) => any
  onUpdated?: (data: T) => any
  onDeleted?: () => any
  canHaveProfileImage?: boolean
  link: string
}
const usePostForm = <T extends TGenericPost, R> ({
  fetchOnMount = true,
  id,
  mapData,
  include = '',
  manager,
  fields = [],
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
  canHaveProfileImage,
  link
}: TProps<T, R>): TForm<T> => {

  const { entity, store, update, destroy, view } = manager

  const isNew = useMemo(() => id === 'new', [id])
  const canEdit = useMemo(() => isNew || entity?.canUpdate !== undefined, [isNew, entity?.canUpdate])

  const imageHandler = useImageSelection<T>({ manager, canHaveProfileImage })
  const pinHandler = usePinHandler<T>({ manager })
  const favouriteHandler = useFavouriteHandler<T>({ manager })
  const permissionHandler = useUserPermissionHandler<T>({ manager })

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
    fetchOnMount,
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
      switch (name as TOneOfAttachableNames) {

        case 'quests':
          return manager.quests?.attach(id, { questId: attachedId })

        case 'languages':
          return manager.languages?.attach(id, { languageId: attachedId })

        case 'locations':
          return manager.locations?.attach(id, { locationId: attachedId })

        case 'characters':
          return manager.characters?.attach(id, { characterId: attachedId })

        case 'notes':
          return manager.notes?.attach(id, { noteId: attachedId })

        case 'encounters':
          return manager.encounters?.attach(id, { encounterId: attachedId })

        case 'factions':
          return manager.factions?.attach(id, { factionId: attachedId })

        case 'scenes':
          return manager.scenes?.attach(id, { sceneId: attachedId })

      }
    },
    onDetach: async (name: keyof T, attachedId) => {
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
    imageHandler,
    pinHandler,
    favouriteHandler,
    permissionHandler,
    link
  }
}

export default usePostForm