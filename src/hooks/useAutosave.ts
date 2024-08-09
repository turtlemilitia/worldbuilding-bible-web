import { useEffect, useState } from 'react'
import equal from 'fast-deep-equal/react'
import { readyDataForRequest } from '../utils/dataUtils'
import { isEmpty } from 'lodash'

type TProps<T> = {
  canAutosave?: boolean;
  delay: number;
  handleOnSave: () => any;
  mapData?: (data: T) => any;
  persistedData?: T;
  newData?: T;
}

const useAutosave = <T extends object> ({
  canAutosave,
  handleOnSave,
  delay = 5000,
  persistedData,
  newData,
  mapData,
}: TProps<T>) => {

  const [autosave, setAutosave] = useState(false)

  // Set a timer to turn autosave on every {delay} milliseconds
  useEffect(() => {
    if (!canAutosave) {
      return;
    }
    const timer = setInterval(() => {
      setAutosave(true);
    }, delay)

    return () => {
      setAutosave(false);
      clearInterval(timer)
    }
  }, [canAutosave, delay])

  // Save data when autosave is triggered and newData is different from persistedData
  useEffect(() => {
    // check autosave is turned on by the timer
    if (!autosave) {
      return;
    }

    // Process the data for comparison and saving
    const processedPersistedData = !isEmpty(persistedData) ? (mapData ? mapData(persistedData) : readyDataForRequest(persistedData)) : {}
    const processedNewData = !isEmpty(newData) ? (mapData ? mapData(newData) : readyDataForRequest(newData)) : {}

    // Compare the processed data and save if they are different
    if (!equal(processedPersistedData, processedNewData)) {
      handleOnSave()
    }

    // Reset autosave flag
    setAutosave(false);

  }, [autosave, newData, handleOnSave])

}

export default useAutosave
