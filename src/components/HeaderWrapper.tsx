import React, { JSX, PropsWithChildren } from 'react'
import bgImage from '../assets/images/city-noir.png'

const HeaderWrapper: React.FunctionComponent<PropsWithChildren> = ({ children }): JSX.Element => {

  return (
    <>
      <div className="bg-cover bg-no-repeat bg-center min-h-96 md:h-underScreen max-h-128 flex items-center justify-center"
           style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="max-w-3xl">
          {children}
        </div>
      </div>
    </>
  )

}

export default HeaderWrapper