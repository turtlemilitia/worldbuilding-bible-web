import { RefObject, useEffect, useState } from 'react'

const useSyncedHeight = (referenceRef: RefObject<HTMLElement>): number|undefined => {
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    const updateHeight = () => {
      if (referenceRef.current) {
        setHeight(referenceRef.current.offsetHeight)
      }
    }

    updateHeight()

    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);

  }, [referenceRef])

  return height;
}