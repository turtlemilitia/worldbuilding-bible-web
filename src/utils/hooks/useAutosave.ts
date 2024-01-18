import { EffectCallback, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import { current } from '@reduxjs/toolkit'
import equal from 'fast-deep-equal/react'

type TProps = {
  canAutosave?: boolean;
  handleSave: (data: any) => any;
  delay: number;
  initialData: any;
  newData: any;
  requestStructureCallback?: (data: any) => any;
}
type TAutosave = (props: TProps) => void;

const useAutosave: TAutosave = ({
  canAutosave,
  handleSave,
  delay = 5000,
  initialData,
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
    initialData = requestStructureCallback ? requestStructureCallback(initialData) : initialData
    newData = requestStructureCallback ? requestStructureCallback(newData) : newData
    if (!equal(initialData, newData)) {
      // save new data (will make it persisted
      handleSave(newData)
      // turn autosave off
      setAutosave(false)
    }

  }, [autosave, newData, handleSave])

}

export default useAutosave