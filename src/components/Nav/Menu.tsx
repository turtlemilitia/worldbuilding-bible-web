import React, { FunctionComponent, JSX, PropsWithChildren } from 'react'

const Menu: FunctionComponent<PropsWithChildren> = ({ children }): JSX.Element => {

  return (
    <div className="w-fit md:w-full">
      <ul className="flex space-x-4 justify-center font-serif text-serif-md text-white">
        {children}
      </ul>
    </div>
  )
}

export default Menu