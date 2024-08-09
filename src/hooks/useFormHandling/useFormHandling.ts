import { useEffect, useMemo, useState } from 'react'
import { TUseFormHandlingProps, TFormHandling } from './types'
import useErrorHandling from '../useErrorHandling'
import useAutosave from '../useAutosave'
import equal from 'fast-deep-equal/react'
import { TGenericPost } from '../../types'

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

  // data which has been saved/persisted, used to compare against new data for the autosave
  // also possibly used in other child components, eg Campaign and Compendium
  persistedData,
}: TUseFormHandlingProps<T, R>): TFormHandling<T> => {

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

  // Save data function
  // todo need to handle when many-to-many or one-to-many relations change
  const handleOnSave = () => {
    if (!data) {
      console.error('cannot save empty data')
      return
    }
    setSaving(true)
    if (isNew) {
      onCreate(data)
        .then((data) => {
          onCreated && onCreated(data)
          setSaving(false)
        })
        .catch(handleOnSaveError)
    } else {
      onUpdate(data)
        .then((data) => {
          onUpdated && onUpdated(data)
          setSaving(false)
        })
        .catch(handleOnSaveError)
    }
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

  // Set up autosave
  useAutosave({
    canAutosave: !isNew,
    delay: 5000,
    handleOnSave,
    persistedData,
    newData: data,
    mapData
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
