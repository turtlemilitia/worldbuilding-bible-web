import { useEffect, useState } from 'react'
import { useFormHandlingType } from './types'
import { TTypesAllowed } from '../../../types'
import useErrorHandling from '../useErrorHandling'
import useAutosave from '../useAutosave'
import { useNavigate } from 'react-router-dom'

const useFormHandling: useFormHandlingType<TTypesAllowed> = ({
  isNew,
  pathToNew,

  onFetch,
  onCreate,
  onUpdate,
  requestStructureCallback,
  onFetched,
  onCreated,
  onUpdated,

  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
}) => {

  const navigate = useNavigate()

  const { errors, handleResponseErrors, resetErrors } = useErrorHandling()
  const [loading, setLoading] = useState(false)

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

  const handleOnFieldChange = (name: string, value: string) => setNewData((prevState) => ({ ...prevState, [name]: value }))

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
    // todo setLoading -- one that is Redux based and only shows in the corner somewhere
    if (isNew) {
      onCreate(newData)
        .then((data) => {
          setPersistedData(data);
          onCreated && onCreated(data)
          navigate(pathToNew(data))
        })
        .catch(handleResponseErrors)
    } else {
      onUpdate(newData)
        .then((data) => {
          updatePersistedData(data);
          onUpdated && onUpdated(data)
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

  return { errors, loading, newData, fetchedData, handleOnFieldChange, handleOnFetch, handleOnSave }

}

export default useFormHandling