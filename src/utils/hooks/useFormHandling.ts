import React, { useEffect, useState } from 'react'
import useErrorHandling from './useErrorHandling'
import useAutosave from './useAutosave'
import { TTypesAllowed } from '../../types'
import equal from 'fast-deep-equal/react'

type TProps<T> = {
  isNew: boolean,
  onFetch: () => Promise<T>,
  onSave: (data: T) => any,
  persistedData: T,
  setPersistedData: (data: T) => Promise<any>,
  resetPersistedData: () => any
  requestStructureCallback?: (data: any) => any,
}

type useFormHandlingType<T> = (data: TProps<T>) => {
  errors: { [key: string]: string };
  loading: boolean;
  data: T;
  handleChange: (name: string, value: string) => any;
  fetchData: () => void;
  handleOnSave: () => void;
};

const useFormHandling: useFormHandlingType<TTypesAllowed> = ({
  isNew,
  onFetch,
  onSave,
  persistedData,
  setPersistedData,
  resetPersistedData,
  requestStructureCallback
}) => {

  const { errors, handleResponseErrors, resetErrors } = useErrorHandling()
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState<TTypesAllowed>(persistedData)

  const handleOnSave = () => {
    // todo setLoading -- one that is Redux based and only shows in the corner somewhere
    onSave(data)
      .catch(handleResponseErrors)
  }

  // add autosave feature
  useAutosave({
    handleSave: handleOnSave,
    delay: 5000,
    initialData: persistedData,
    newData: data,
    requestStructureCallback,
    canAutosave: !isNew
  })

  useEffect(() => {

    // fetch data on mount
    if (!isNew) {
      fetchData()
    }

    // on unmount reset the data
    return () => {
      resetPersistedData()
    }

  }, [])

  // need this to reset the persistedData when its a new page
  useEffect(() => {

    // persisted data doesn't seem to be changing the new data when it changes
    // if (!persistedData.id) {
      setData(persistedData)
    // }

  }, [persistedData])

  const handleChange = (name: string, value: string) => setData((prevState) => ({ ...prevState, [name]: value }))

  const fetchData = () => {
    setLoading(true)
    resetErrors()
    onFetch()
      .then((apiData) => {
        setData(apiData)
        setPersistedData(apiData)
      })
      .catch(handleResponseErrors)
      .finally(() => {
        setLoading(false)
      })
  }

  return { errors, loading, data, handleChange, fetchData, handleOnSave }

}

export default useFormHandling