import { EffectCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import { current } from '@reduxjs/toolkit'
import equal from 'fast-deep-equal/react'

type TProps = {
  canAutosave?: boolean;
  delay: number;

  handleOnSave: (data: any) => any;
  requestStructureCallback?: (data: any) => any;

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
  requestStructureCallback,
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
    persistedData = requestStructureCallback ? requestStructureCallback(persistedData) : persistedData
    newData = requestStructureCallback ? requestStructureCallback(newData) : newData
    if (!equal(persistedData, newData)) {
      // save new data (will make it persisted
      handleOnSave(newData)
      // turn autosave off
      setAutosave(false)
    }

  }, [autosave, newData, handleOnSave])

}

export default useAutosave