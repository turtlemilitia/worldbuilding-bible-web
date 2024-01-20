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

  onFetch,
  onCreate,
  onUpdate,
  onDelete,
  requestStructureCallback,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,

  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
}) => {

  const navigate = useNavigate()

  const { errors, handleResponseErrors, resetErrors } = useErrorHandling()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // data which is changed
  const [newData, setNewData] = useState<TTypesAllowed>(persistedData)
  // data which came back at the end of the fetch
  const [fetchedData, setFetchedData] = useState<TTypesAllowed>(persistedData)

  useEffect(() => {

    // fetch data on mount
    if (!isNew) {
      handleOnFetch()
    }

    // on unmount reset the data
    return () => {
      resetPersistedData()
    }

  }, [])

  // need this to reset the persistedData when its a new page
  useEffect(() => {

    // persisted data doesn't seem to be changing the new data when it changes
    if (!persistedData.id) {
      setFetchedData(persistedData)
      setNewData(persistedData)
    }

  }, [persistedData])

  const handleOnFieldChange = (name: string, value: string) => setNewData((prevState) => ({
    ...prevState,
    [name]: value
  }))

  const handleOnFetch = () => {
    setLoading(true)
    resetErrors()
    onFetch()
      .then((apiData) => {
        setNewData(apiData)
        setPersistedData(apiData)
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
        .catch(handleResponseErrors)
    } else {
      onUpdate(newData)
        .then((data) => {
          updatePersistedData(data)
          onUpdated && onUpdated(data)
          setSaving(false)
        })
        .catch(handleResponseErrors)
    }
  }

  // add autosave feature
  useAutosave({
    canAutosave: !isNew,
    delay: 5000,

    handleOnSave,
    requestStructureCallback,

    persistedData,
    newData
  })

  const handleOnDelete = () => {
    setLoading(true);
    onDelete()
      .then(() => {
        onDeleted && onDeleted()
        navigate(pathAfterDelete)
        setLoading(false);
      })
      .catch(handleResponseErrors)
  }

  return { errors, loading, saving, newData, fetchedData, handleOnFieldChange, handleOnFetch, handleOnSave, handleOnDelete }

}

export default useFormHandling