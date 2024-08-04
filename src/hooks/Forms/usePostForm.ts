import { TForm } from '../../components/Post/types'
import useFormHandling from '../useFormHandling'
import { TGenericPost } from '../../types'
import { TField } from '../fieldTools'
import { useEffect, useMemo } from 'react'
import useImageSelection from '../useImageSelection'
import { hasImageableDataManager, TDataManager } from '../DataManagers'

type TProps<T, R> = {
  id: string | number,
  mapData: (payload: T) => R,
  include?: string,
  manager: TDataManager<T, R> & hasImageableDataManager,
  fields?: TField[],
  onFetched?: (data: T) => any
  onCreated?: (data: T) => any
  onUpdated?: (data: T) => any
  onDeleted?: () => any
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
}: TProps<T, R>): TForm<T> => {

  const { entity, store, update, destroy, view } = manager

  const isNew = useMemo(() => id === 'new', [id])
  const canEdit = useMemo(() => isNew || entity?.canUpdate !== undefined, [isNew, entity?.canUpdate])

  const imageHandler = useImageSelection<T>({ manager })

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