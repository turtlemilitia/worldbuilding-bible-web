import React, { JSX, PropsWithChildren } from 'react'

const ContentWrapper: React.FunctionComponent<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <div className="relative w-full bg-stone-300 pt-10 flex justify-center">
      <div className="block w-full max-w-3xl">
        {children}
      </div>
    </div>
  )
}

export default ContentWrapper;