import React, { FunctionComponent, PropsWithChildren } from 'react'

const RightBar: FunctionComponent<PropsWithChildren> = ({children}) => {
  return (
    <div className={`fixed z-50 top-28 right-6 pt-5 w-1/4`}>
      {children}
    </div>
  )
}

export default RightBar