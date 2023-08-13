import React, { JSX } from 'react'

interface TProps {
  errorText: string
}

const ErrorBanner: React.FunctionComponent<TProps> = ({ errorText }: TProps): JSX.Element => {
  return (
    <div className="px-5 py-3 bg-burnOrange bg-opacity-60 rounded-2xl">
      {errorText}
    </div>
  )
}

export default ErrorBanner