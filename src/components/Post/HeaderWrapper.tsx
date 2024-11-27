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
        <div className={`relative h-96 md:h-underScreen max-h-[720px] flex items-center justify-center lg:justify-start xl:justify-center`}>
          <div className="w-full lg:w-2/3 xl:w-2/4 xl:max-w-4xl text-center py-6 mt-6">
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