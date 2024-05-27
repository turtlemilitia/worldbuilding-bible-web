import { useEffect, useState } from 'react'
import { useFormHandlingProps, useFormHandlingType } from './types'
import useErrorHandling from '../useErrorHandling'
import useAutosave from '../useAutosave'
import equal from 'fast-deep-equal/react'

const useFormHandling = <T> ({
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
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
}: useFormHandlingProps<T>): useFormHandlingType<T> => {

  const { errors, handleResponseErrors, resetErrors } = useErrorHandling()

  // when we are fetching or deleting
  const [loading, setLoading] = useState(true)
  // when we are saving (autosave)
  const [saving, setSaving] = useState(false)
  const [newData, setNewData] = useState<Partial<T>>()

  // Fetch data on mount
  useEffect(() => {
    if (!isNew) {
      handleOnFetch()
    } else {
      resetPersistedData && resetPersistedData()
      setLoading(false)
    }

    // Reset loading state on unmount
    return () => {
      setLoading(true)
    }

  }, [id])

  // Sync newData with persistedData
  useEffect(() => {
    if (!equal(persistedData, newData)) {
      setNewData(persistedData)
    }
  }, [persistedData])

  // Handle field changes
  const handleOnFieldChange = (name: string, value: string) => setNewData((prevState) => ({
    ...prevState,
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
        setPersistedData(apiData)
      })
      .catch(handleResponseErrors)
      .finally(() => {
        setLoading(false)
      })
  }

  // Save data function
  const handleOnSave = () => {
    setSaving(true)
    if (isNew) {
      onCreate(newData)
        .then((data) => {
          setPersistedData(data)
          onCreated && onCreated(data)
          setSaving(false)
        })
        .catch(handleOnSaveError)
    } else {
      onUpdate(newData)
        .then((data) => {
          updatePersistedData(data)
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
    newData,
    mapData
  })

  return {
    errors,
    loading,
    saving,
    newData,
    setNewData,
    onFieldChange: handleOnFieldChange,
    onFetch: handleOnFetch,
    onSave: handleOnSave,
    onDelete: handleOnDelete
  }

}

export default useFormHandling
