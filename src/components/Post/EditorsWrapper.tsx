import React, { JSX, PropsWithChildren } from 'react'

const EditorsWrapper: React.FunctionComponent<PropsWithChildren> = ({
  children
}): JSX.Element => {
  return (
    <div className="relative block w-full max-w-4xl m-auto px-3">
      {children}
    </div>
  )
}

export default EditorsWrapper