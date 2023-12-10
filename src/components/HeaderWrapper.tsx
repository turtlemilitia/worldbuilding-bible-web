import React, { JSX, PropsWithChildren } from 'react'

type TProps = {
  page?: string,
  bgImage?: string
}

const HeaderWrapper: React.FunctionComponent<TProps & PropsWithChildren> = ({ page, children, bgImage }): JSX.Element => {

  return (
    <>
      <header
        className={bgImage ? "bg-cover bg-no-repeat bg-center" : ''}
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}>
        <div className={`bg-stone-950 bg-opacity-20 md:h-underScreen flex items-center justify-center`}>
          <div className="w-full md:w-2/4 max-w-2xl text-center py-6 mt-6">
            {page && <h2 className="uppercase font-sans-serif text-stone-400 tracking-widest">{page}</h2>}
            <div className={'text-stone-100'}>
              {children}
            </div>
          </div>
        </div>
      </header>
    </>
  )

}

export default HeaderWrapper