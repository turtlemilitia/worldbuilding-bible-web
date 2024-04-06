import React, { JSX, PropsWithChildren } from 'react'
import { THeaderWrapperProps } from './types'
import { CoverImagePicker } from '../CoverImagePicker'
import bgImage from '../../assets/images/darkAlley1.png'

const HeaderWrapper: React.FunctionComponent<THeaderWrapperProps & PropsWithChildren> = ({
  page,
  children,
  coverImage,
  onCoverImageSelected
}): JSX.Element => {
  return (
    <>
      <header
        className={`relative bg-cover bg-no-repeat bg-center`}
        style={{ backgroundImage: `url(${coverImage || bgImage})` }}>
        <div className={`bg-stone-950/50 md:h-underScreen flex items-center justify-center`}>
          <div className="w-full md:w-2/4 max-w-2xl text-center py-6 mt-6">
            {page && <h2 className="uppercase font-sans-serif text-stone-400 tracking-widest">{page}</h2>}
            <div className={'text-stone-100'}>
              {children}
            </div>
          </div>
        </div>

        {onCoverImageSelected && (
          <CoverImagePicker onCoverImageSelected={onCoverImageSelected}/>
        )}

      </header>
    </>
  )

}

export default HeaderWrapper