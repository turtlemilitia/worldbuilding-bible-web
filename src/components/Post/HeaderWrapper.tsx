import React, { JSX, PropsWithChildren } from 'react'

export type TProps = {
  page?: string,
}
const HeaderWrapper: React.FunctionComponent<TProps & PropsWithChildren> = ({
  page,
  children
}): JSX.Element => {
  return (
    <>
      <header>
        <div className={`relative md:h-underScreen flex items-center justify-center`}>
          <div className="w-full md:w-2/4 max-w-4xl text-center py-6 mt-6">
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