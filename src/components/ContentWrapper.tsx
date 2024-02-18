import React, { JSX, PropsWithChildren } from 'react'

const ContentWrapper: React.FunctionComponent<PropsWithChildren> = ({
  children
}): JSX.Element => {
  return (
    <div className="relative">
      <div className={`antialiased text-stone-200 relative py-5 px-3 flex justify-center backdrop-blur-md border-t border-opacity-50 border-stone-700 bg-stone-950 bg-opacity-80`}>
        <div className="block w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ContentWrapper