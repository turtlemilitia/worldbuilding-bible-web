import React, { JSX } from 'react'

interface TProps {
  errorText: string
}

const ErrorBanner: React.FunctionComponent<TProps> = ({ errorText }: TProps): JSX.Element => {
  return <div className="px-3">
    <div className="px-3 py-1 border border-burnOrange bg-burnOrange bg-opacity-60 rounded-lg">
      {errorText}
    </div>
  </div>
}

export default ErrorBanner