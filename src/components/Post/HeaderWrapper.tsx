import React, { JSX, PropsWithChildren } from 'react'
import { CoverImagePicker } from '../CoverImagePicker'

export type TProps = {
  page?: string,
  onCoverImageSelected?: (imageId: number) => Promise<any>;
}
const HeaderWrapper: React.FunctionComponent<TProps & PropsWithChildren> = ({
  page,
  children, onCoverImageSelected
}): JSX.Element => {
  return (
    <>
      <header>
        <div className={`relative md:h-underScreen flex items-center justify-center`}>
          <div className="w-full md:w-2/4 max-w-2xl text-center py-6 mt-6">
            {page && <h2 className="uppercase font-sans-serif text-stone-400 tracking-widest">{page}</h2>}
            <div className={'text-stone-100'}>
              {children}
            </div>
          </div>

          {onCoverImageSelected && (
            <CoverImagePicker onCoverImageSelected={onCoverImageSelected}/>
          )}
        </div>
      </header>
    </>
  )

}

export default HeaderWrapper