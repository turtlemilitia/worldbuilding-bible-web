import { useEffect, useState } from 'react'
import { useFormHandlingType } from './types'
import { TTypesAllowed } from '../../../types'
import useErrorHandling from '../useErrorHandling'
import useAutosave from '../useAutosave'
import { useNavigate } from 'react-router-dom'

const useFormHandling: useFormHandlingType<TTypesAllowed> = ({
  isNew,
  pathToNew,
  pathAfterDelete,
  mapData,

  onFetch,
  onCreate,
  onUpdate,
  onDelete,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,

  defaultData = {},

  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
}) => {

  const navigate = useNavigate()

  const { errors, handleResponseErrors, resetErrors } = useErrorHandling()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // data which is changed
  const [newData, setNewData] = useState<object>(persistedData)
  // data which came back at the end of the fetch
  const [fetchedData, setFetchedData] = useState<TTypesAllowed>(persistedData)

  useEffect(() => {

    // fetch data on mount
    if (!isNew) {
      handleOnFetch()
    } else {
      resetPersistedData()
      setLoading(false)
    }

    // on unmount reset the data
    return () => {
      setLoading(true)
    }

  }, [])

  // need this to reset the persistedData when its a new page
  useEffect(() => {

    // persisted data doesn't seem to be changing the new data when it changes
    if (!persistedData?.id) {
      setFetchedData(defaultData)
      setNewData(defaultData)
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
        setNewData(apiData)
        updatePersistedData(apiData)
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
          navigate(pathToNew(data))
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
  useAutosave({
    canAutosave: !isNew,
    delay: 5000,

    handleOnSave,

    persistedData,
    newData,

    mapData
  })

  const handleOnDelete = () => {
    setLoading(true)
    onDelete()
      .then(() => {
        onDeleted && onDeleted()
        navigate(pathAfterDelete)
        setLoading(false)
      })
      .catch(handleResponseErrors)
  }

  return {
    errors,
    loading,
    saving,
    newData,
    fetchedData,
    handleOnFieldChange,
    handleOnFetch,
    handleOnSave,
    handleOnDelete
  }

}

export default useFormHandling