import React, { JSX, PropsWithChildren } from 'react'
import RippedPaperEffect from '../assets/images/RippedPaperEffect';
import { EqualIcon } from 'lucide-react'

const ContentWrapper: React.FunctionComponent<PropsWithChildren> = ({ children }): JSX.Element => {
  return (
    <div className="relative">
      <div className="absolute -top-8 left-0 right-0 w-full h-8">
        <RippedPaperEffect className="w-full rotate-180 fill-stone-200 left-0"/>
      </div>
      <div className="relative bg-stone-200 py-5 px-3 flex justify-center">
        <div className="block w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ContentWrapper