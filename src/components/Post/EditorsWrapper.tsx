import React, { JSX, PropsWithChildren } from 'react'
import { clsx } from 'clsx'

const EditorsWrapper: React.FunctionComponent<PropsWithChildren> = ({
  children
}): JSX.Element => {
  return (
    <div className={clsx([
      "relative block",
      "m-auto lg:ml-4 px-3"
    ])}>
      {children}
    </div>
  )
}

export default EditorsWrapper