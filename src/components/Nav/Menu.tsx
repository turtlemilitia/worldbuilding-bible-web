import React, { FunctionComponent, JSX, PropsWithChildren } from 'react'

const Menu: FunctionComponent<PropsWithChildren> = ({ children }): JSX.Element => {

  return (
    <div className="w-full">
      <ul className="flex space-x-3 justify-center gap-4 font-serif text-serif-md text-white">
        {children}
      </ul>
    </div>
  )
}

export default Menu