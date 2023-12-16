import React, { JSX } from 'react'
import { TErrorBannerProps } from './types'

const ErrorBanner: React.FunctionComponent<TErrorBannerProps> = ({ errors }) => {
  return (
    <div className="px-5 py-3 bg-burnOrange bg-opacity-60 rounded-2xl">
      {Object.entries(errors).map(([key, value]) => `${value}`).join('\n')}
    </div>
  )
}

export default ErrorBanner