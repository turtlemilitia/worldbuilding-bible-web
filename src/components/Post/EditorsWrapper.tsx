import React, { JSX, PropsWithChildren } from 'react'
import { clsx } from 'clsx'

const EditorsWrapper: React.FunctionComponent<PropsWithChildren> = ({
  children
}): JSX.Element => {
  return (
    <div className={clsx([
      "relative block w-full xl:w-2/3 2xl:w-2/4 max-w-4xl",
      "m-auto xl:ml-4 2xl:m-auto px-3"
    ])}>
      {children}
    </div>
  )
}

export default EditorsWrapper