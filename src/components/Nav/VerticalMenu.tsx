import React, { FunctionComponent, JSX, PropsWithChildren } from 'react'

const VerticalMenu: FunctionComponent<PropsWithChildren> = ({ children }): JSX.Element => {

  return (
    <div className="w-full">
      <ul className="space-y-3 justify-center font-serif text-serif-md text-white">
        {children}
      </ul>
    </div>
  )
}

export default VerticalMenu