import { useEffect, useState } from 'react'
import equal from 'fast-deep-equal/react'
import { readyDataForRequest } from '../dataUtils'

type TProps = {
  canAutosave?: boolean;
  delay: number;

  handleOnSave: (data: any) => any;

  persistedData: any;
  newData: any;
}
type TAutosave = (props: TProps) => void;

const useAutosave: TAutosave = ({
  canAutosave,
  handleOnSave,
  delay = 5000,
  persistedData,
  newData,
}) => {

  const [autosave, setAutosave] = useState(false)

  // set a timer to turn autosave on every {delay} milliseconds
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

  }, [canAutosave])

  // every time the autosave or data is changed
  useEffect(() => {
    // check autosave is turned on by the timer
    if (!autosave) {
      return;
    }
    // compare previous persisted data and changed data
    persistedData = readyDataForRequest(persistedData)
    newData = readyDataForRequest(newData)
    if (!equal(persistedData, newData)) {
      debugger;
      // save new data (will make it persisted
      handleOnSave(newData)
      // turn autosave off
      setAutosave(false)
    }

  }, [autosave, newData, handleOnSave])

}

export default useAutosave