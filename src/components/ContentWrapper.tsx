import React, { JSX, PropsWithChildren } from 'react'
import ErrorBanner from './Banners/ErrorBanner'


interface TProps extends PropsWithChildren {
  errorText?: string
}
const ContentWrapper: React.FunctionComponent<TProps> = ({ children, errorText }): JSX.Element => {
  return (
    <div className="relative w-full bg-stone-200 py-5 px-3 flex justify-center">
      <div className="block w-full max-w-3xl">
        {errorText &&
          <ErrorBanner errorText={errorText}/>
        }
        {children}
      </div>
    </div>
  )
}

export default ContentWrapper;