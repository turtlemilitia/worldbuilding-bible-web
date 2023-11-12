import React, { JSX, PropsWithChildren } from 'react'

type TProps = {
  page?: string,
  bgImage?: string
}

const HeaderWrapper: React.FunctionComponent<TProps & PropsWithChildren> = ({ page, children, bgImage }): JSX.Element => {

  return (
    <>
      <header
        className={bgImage ? "bg-cover bg-no-repeat bg-center" : 'bg-stone-200'}
        style={bgImage ? { backgroundImage: `url(${bgImage})` } : {}}>
        <div className={`${bgImage ? "bg-stone-950 bg-opacity-50 md:h-underScreen" : ''} flex items-center justify-center`}>
          <div className="w-full md:w-2/4 max-w-2xl text-center py-6 mt-6">
            {page && <h2 className="uppercase text-stone-400 tracking-widest">{page}</h2>}
            <div className={bgImage ? 'text-stone-100' : 'text-stone-700'}>
              {children}
            </div>
          </div>
        </div>
      </header>
    </>
  )

}

export default HeaderWrapper