import React, { FunctionComponent, JSX, PropsWithChildren } from 'react'

const Menu: FunctionComponent<PropsWithChildren> = ({ children }): JSX.Element => {

  return (
    <ul className="w-fit flex space-x-4 justify-center font-serif text-serif-md text-white">
      {children}
    </ul>
  )
}

export default Menu