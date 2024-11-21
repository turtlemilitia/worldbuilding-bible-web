import { useCallback, useEffect, useRef, useState } from 'react'
import useErrorHandling from '../useErrorHandling'
import useAutosave from '../useAutosave'
import equal from 'fast-deep-equal/react'
import { TGenericPostBasic } from '@/types'
import { TFormHandling } from './types'
import { isEmpty } from 'lodash'
import { readyDataForRequest } from '@/utils/dataUtils'

const MAX_RETRIES = 3

type TProps<T, R> = {
  fetchOnMount?: boolean;
  id: string | number | 'new'
  isNew: boolean,
  mapData: (data: T) => R;
  canEdit: boolean;

  // API
  onFetch: () => Promise<T>,
  onCreate: (data: any) => Promise<T>;
  onUpdate: (data: any) => Promise<T>;
  onDelete: () => Promise<any>
  onFetched?: (data: T) => any
  onCreated?: (data: T) => any
  onUpdated?: (data: T) => any
  onDeleted?: () => any
  manyToManyFields?: (keyof T)[]
  onAttach?: (name: keyof T, id: number | string) => Promise<any>
  onDetach?: (name: keyof T, id: number | string) => Promise<any>

  // persisted data
  persistedData?: T,
}
const useFormHandling = <T, R> ({
  id,
  isNew,
  mapData,
  canEdit,

  fetchOnMount = true,
  onFetch,
  onCreate,
  onUpdate,
  onDelete,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
  manyToManyFields,
  onAttach,
  onDetach,

  // data which has been saved/persisted, used to compare against new data for the autosave
  // also possibly used in other child components, eg Campaign and Compendium
  persistedData,
}: TProps<T, R>): TFormHandling<T> => {

  const { errors, handleResponseErrors, resetErrors } = useErrorHandling()

  // when we are fetching or deleting
  const [loading, setLoading] = useState(true)
  // when we are saving (autosave)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState<T>()

  const retryCount = useRef(0)

  // Fetch data on mount
  useEffect(() => {
    if (!isNew && fetchOnMount) {
      handleOnFetch()
    } else {
      setLoading(false)
    }

  }, [id])

  // Sync newData with persistedData
  useEffect(() => {
    if (!equal(persistedData, data)) {
      setData(persistedData)
    }
  }, [persistedData])

  // Handle field changes
  const handleOnFieldChange = (name: string, value: string) => setData((prevState) => ({
    ...prevState as T,
    [name]: value
  }))

  // Handle save errors
  const handleOnSaveError = (err: any) => {
    handleResponseErrors(err)
    setSaving(false)
  }

  // Fetch data function
  const handleOnFetch = () => {
    setLoading(true)
    resetErrors()

    const fetchData = () => {
      onFetch()
        .then((apiData) => {
          onFetched && onFetched(apiData)
          setLoading(false)
          retryCount.current = 0 // Reset retry count on success
        })
        .catch((err) => {
          handleResponseErrors(err)
          if (retryCount.current < MAX_RETRIES) {
            retryCount.current += 1
            const delay = Math.pow(2, retryCount.current) * 1000 // Exponential backoff
            setTimeout(fetchData, delay)
          } else {
            console.error('Fetch failed. Try again.')
          }
        })
    }

    fetchData()
  }

  const processedData = useCallback((data: T | undefined): R | {} => {
    return (data && !isEmpty(data))
      ? (mapData ? mapData(data) : readyDataForRequest(data))
      : {}
  }, [mapData])

  // Save data function
  const handleOnSave = async () => {
    if (!canEdit) {
      setSaving(true)
      await handleManyToMany()
      setSaving(false)
    }
    if (!data) {
      console.error('cannot save empty data')
      return
    }
    setSaving(true)

    // Process the data for comparison and saving
    const processedPersistedData = processedData(persistedData)
    const processedNewData = processedData(data)

    // Compare the processed data and save if they are different
    try {
      if (isNew) {
        if (!equal(processedPersistedData, processedNewData)) {
          const result = await onCreate(data)
          onCreated && onCreated(result)
        }
        await handleManyToMany()
      } else {
        if (!equal(processedPersistedData, processedNewData)) {
          const result = await onUpdate(data)
          onUpdated && onUpdated(result)
        }
        await handleManyToMany()
      }
    } catch (err) {
      handleOnSaveError(err)
    }
    setSaving(false)
  }

  const handleManyToMany = async () => {
    if (!persistedData || !data || !manyToManyFields || !(onAttach || onDetach)) {
      return
    }
    const attachEntityPromises: Promise<void>[] = []
    const detachEntityPromises: Promise<void>[] = []
    manyToManyFields
    .filter((key) => canEdit ? true : key === 'notes')
    .forEach((key) => {
      const entitiesToAttach = (data[key] as TGenericPostBasic[])
        ?.filter(entity => !(persistedData[key] as TGenericPostBasic[])?.some(prevEntity => prevEntity.id === entity.id))
      const entitiesToDetach = (persistedData[key] as TGenericPostBasic[])
        ?.filter(entity => !(data[key] as TGenericPostBasic[])?.some(newEntity => newEntity.id === entity.id))

      if (entitiesToAttach && onAttach) {
        attachEntityPromises.push(...entitiesToAttach.map(entity => onAttach(key, entity.id)) || [])
      }
      if (entitiesToDetach && onDetach) {
        detachEntityPromises.push(...entitiesToDetach.map(entity => onDetach(key, entity.slug)) || [])
      }
    })
    return Promise.all([
      ...attachEntityPromises,
      ...detachEntityPromises,
    ])
  }

  // Delete data function
  const handleOnDelete = () => {
    setLoading(true)
    onDelete()
      .then(() => {
        onDeleted && onDeleted()
        setLoading(false)
      })
      .catch(handleResponseErrors)
  }

  const mapDataWithManyToMany = useCallback((data: T) => {
    const mappedData: any = processedData(data)
    if (mappedData && manyToManyFields) {
      manyToManyFields.forEach((key) => {
        mappedData[key] = data[key]
      })
    }
    return mappedData
  }, [processedData, manyToManyFields])

  // Set up autosave
  useAutosave({
    canAutosave: !isNew && !loading,
    delay: 5000,
    handleOnSave,
    persistedData: persistedData && mapDataWithManyToMany(persistedData),
    newData: data && mapDataWithManyToMany(data),
  })

  return {
    errors,
    loading,
    saving,
    data,
    setData,
    onFieldChange: handleOnFieldChange,
    onFetch: handleOnFetch,
    onSave: handleOnSave,
    onDelete: handleOnDelete
  }

}

export default useFormHandling
