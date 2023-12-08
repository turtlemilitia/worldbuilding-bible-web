import React, { JSX, PropsWithChildren } from 'react'
import RippedPaperEffect from '../assets/images/RippedPaperEffect'
import ShadeImage from '../assets/images/ShadeImage.png'

type TProps = {
  showPaperEffect?: boolean
}
const ContentWrapper: React.FunctionComponent<TProps & PropsWithChildren> = ({
  children,
  showPaperEffect
}): JSX.Element => {
  return (
    <div className="relative">
      {showPaperEffect &&
        <div className="absolute -top-8 left-0 right-0 w-full h-8">
          <RippedPaperEffect className="w-full rotate-180 fill-stone-200 left-0"/>
        </div>
      }
      <div className="relative py-5 px-3 flex justify-center bg-blur">
        <div className="block w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ContentWrapper