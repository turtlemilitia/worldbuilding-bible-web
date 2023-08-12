import React, { JSX, PropsWithChildren } from 'react'

const ContentWrapper: React.FunctionComponent<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <div className="relative bg-stone-200 py-5 px-3 flex justify-center ripped-paper">
      <div className="block w-full">
        {children}
      </div>
    </div>
  )
}

export default ContentWrapper;