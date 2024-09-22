import React, { FunctionComponent, PropsWithChildren } from 'react'

const RightBar: FunctionComponent<PropsWithChildren> = ({children}) => {
  return (
    <div className={`fixed z-20 top-28 right-0 pt-5 w-1/4 h-[calc(100%-7rem)] pb-5 px-6 overflow-x-visible overflow-y-scroll no-scrollbar`}>
      {children}
    </div>
  )
}

export default RightBar