import { useCallback, useEffect, useState } from 'react'
import useErrorHandling from '../useErrorHandling'
import useAutosave from '../useAutosave'
import equal from 'fast-deep-equal/react'
import { TGenericPostBasic } from '../../types'
import { TFormHandling } from './types'
import { isEmpty } from 'lodash'
import { readyDataForRequest } from '../../utils/dataUtils'

type TProps<T, R> = {
  id: string | number | 'new'
  isNew: boolean,
  mapData: (data: T) => R;

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

  // Fetch data on mount
  useEffect(() => {
    if (!isNew) {
      handleOnFetch()
    } else {
      setLoading(false)
    }

    // Reset loading state on unmount
    return () => {
      setLoading(true)
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
    onFetch()
      .then((apiData) => {
        onFetched && onFetched(apiData)
      })
      .catch(handleResponseErrors)
      .finally(() => {
        setLoading(false)
      })
  }

  const processedData = useCallback((data: T | undefined): R|{} => {
    return (data && !isEmpty(data))
      ? (mapData ? mapData(data) : readyDataForRequest(data))
      : {}
  }, [mapData])

  // Save data function
  const handleOnSave = async () => {
    if (!data) {
      console.error('cannot save empty data')
      return
    }
    setSaving(true)

    debugger;
    // Process the data for comparison and saving
    const processedPersistedData = processedData(persistedData)
    const processedNewData = processedData(data)

    // Compare the processed data and save if they are different
    try {
      debugger;
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
    debugger
    if (!persistedData || !data || !manyToManyFields || !(onAttach || onDetach)) {
      return
    }
    const attachEntityPromises: Promise<void>[] = []
    const detachEntityPromises: Promise<void>[] = []
    manyToManyFields.forEach((key) => {
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

  const mapDataWithManyToMany = (data: T) => {
    const mappedData: any = processedData(data)
    if (mappedData && manyToManyFields) {
      manyToManyFields.forEach((key) => {
        mappedData[key] = data[key]
      })
    }
    return mappedData
  }

  // Set up autosave
  useAutosave({
    canAutosave: !isNew,
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
