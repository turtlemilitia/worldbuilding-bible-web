import React, { JSX, PropsWithChildren, useState } from 'react'
import { THeaderWrapperProps } from './types'
import { CoverImagePicker } from '../CoverImagePicker'

const HeaderWrapper: React.FunctionComponent<THeaderWrapperProps & PropsWithChildren> = ({
  page,
  children,
  coverImage,
  onCoverImageSelected
}): JSX.Element => {

  return (
    <>
      <header
        className={`relative ${coverImage ? 'bg-cover bg-no-repeat bg-center' : ''}`}
        style={coverImage ? { backgroundImage: `url(${coverImage})` } : {}}>

        <div className={`bg-stone-950 bg-opacity-20 md:h-underScreen flex items-center justify-center`}>
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