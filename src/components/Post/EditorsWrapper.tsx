import React, { JSX, PropsWithChildren } from 'react'
import { clsx } from 'clsx'

const EditorsWrapper: React.FunctionComponent<PropsWithChildren> = ({
  children
}): JSX.Element => {
  return (
    <div className={clsx([
      "relative block w-full lg:w-2/3 xl:w-2/4 xl:max-w-4xl",
      "m-auto lg:ml-4 xl:m-auto px-3"
    ])}>
      {children}
    </div>
  )
}

export default EditorsWrapper