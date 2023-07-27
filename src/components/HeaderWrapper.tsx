import React, { JSX, PropsWithChildren } from 'react'
import bgImage from '../assets/images/city-noir.png'

const HeaderWrapper: React.FunctionComponent<PropsWithChildren> = ({ children }): JSX.Element => {

  return (
    <>
      <div className="bg-cover bg-no-repeat bg-center md:h-40 flex justify-center"
           style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="max-w-5xl">
          {children}
        </div>
      </div>
    </>
  )

}

export default HeaderWrapper