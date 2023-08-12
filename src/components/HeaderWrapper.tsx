import React, { JSX, PropsWithChildren } from 'react'
import bgImage from '../assets/images/city-noir.png'

interface TProps extends PropsWithChildren {
  page?: string
}

const HeaderWrapper: React.FunctionComponent<TProps> = ({ page, children }): JSX.Element => {

  return (
    <>
      <header
        className="bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="bg-stone-950 bg-opacity-50 md:h-underScreen flex items-center justify-center">
          <div className="w-full md:w-2/4 text-center">
            {page && <h2 className="uppercase text-stone-400 tracking-widest">{page}</h2>}
            {children}
          </div>
        </div>
      </header>
    </>
  )

}

export default HeaderWrapper