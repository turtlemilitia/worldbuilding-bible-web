import { useEffect, useState } from 'react'
import { useFormHandlingProps, useFormHandlingType } from './types'
import useErrorHandling from '../useErrorHandling'
import useAutosave from '../useAutosave'
import equal from 'fast-deep-equal/react'
import { isEmpty } from 'lodash'

const useFormHandling = <T>({
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

  // data which is changed
  const [newData, setNewData] = useState<Partial<T>>()
  // data which came back at the end of the fetch
  const [fetchedData, setFetchedData] = useState<T>()

  // on mount
  useEffect(() => {

    // fetch data on mount
    if (!isNew) {
      handleOnFetch()
    } else {
      resetPersistedData && resetPersistedData()
      setLoading(false)
    }

    // on unmount reset the data
    return () => {
      setLoading(true)
    }

  }, [])

  useEffect(() => {

    setPersistedData(fetchedData as T)
    setNewData(fetchedData)

  }, [fetchedData])

  // need this to reset the persistedData when its a new page
  useEffect(() => {

    // todo this needs to be tested
    // persisted data doesn't seem to be changing the new data when it changes
    if (!equal(persistedData, fetchedData)) {
      setFetchedData(persistedData)
    }
    if (!equal(persistedData, newData)) {
      setNewData(persistedData)
    }

  }, [persistedData])

  const handleOnFieldChange = (name: string, value: string) => setNewData((prevState) => ({
    ...prevState,
    [name]: value
  }))

  const handleOnSaveError = (err: any) => {
    handleResponseErrors(err);
    setSaving(false);
  }

  const handleOnFetch = () => {
    setLoading(true)
    resetErrors()
    onFetch()
      .then((apiData) => {
        setFetchedData(apiData)
        onFetched && onFetched(apiData)
      })
      .catch(handleResponseErrors)
      .finally(() => {
        setLoading(false)
      })
  }

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

  // add autosave feature
  const handleOnDelete = () => {
    setLoading(true)
    onDelete()
      .then(() => {
        onDeleted && onDeleted()
        setLoading(false)
      })
      .catch(handleResponseErrors)
  }

  useAutosave({
    canAutosave: !isNew,
    delay: 5000,

    handleOnSave,

    persistedData,
    newData,

    mapData
  })

  const updateAllData = (data: T) => {
    setNewData(prevState => ({...prevState, ...data}))
    setFetchedData(prevState => ({...prevState, ...data}))
  }

  return {
    errors,
    loading,
    saving,
    newData,
    setNewData,
    fetchedData,
    setFetchedData,
    updateAllData,
    onFieldChange: handleOnFieldChange,
    onFetch: handleOnFetch,
    onSave: handleOnSave,
    onDelete: handleOnDelete
  }

}

export default useFormHandling