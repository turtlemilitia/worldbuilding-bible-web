import React, { JSX, PropsWithChildren, useState } from 'react'
import { SelectImageButton } from './SelectImageButton'
import { Popover, Transition } from '@headlessui/react'
import { CoverImagePicker } from './ImagePicker'

type TProps = {
  page?: string,
  bgImage?: string
}

const HeaderWrapper: React.FunctionComponent<TProps & PropsWithChildren> = ({
  page,
  children,
  bgImage
}): JSX.Element => {

  const [coverImagePopUpOpen, setCoverImagePopUpOpen] = useState(false)

  return (
    <>
      <header
        className={`relative ${bgImage ? 'bg-cover bg-no-repeat bg-center' : ''}`}
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}>

        <div className={`bg-stone-950 bg-opacity-20 md:h-underScreen flex items-center justify-center`}>
          <div className="w-full md:w-2/4 max-w-2xl text-center py-6 mt-6">
            {page && <h2 className="uppercase font-sans-serif text-stone-400 tracking-widest">{page}</h2>}
            <div className={'text-stone-100'}>
              {children}
            </div>
          </div>
        </div>

        <Popover className="z-40 absolute -bottom-7 right-10">

          <Popover.Button>
            <SelectImageButton/>
          </Popover.Button>

          <Popover.Panel className="absolute bottom-full mb-4 right-0 z-10">
            <CoverImagePicker/>
          </Popover.Panel>

        </Popover>
      </header>
    </>
  )

}

export default HeaderWrapper