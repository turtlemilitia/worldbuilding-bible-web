import React, { FunctionComponent, PropsWithChildren } from 'react'
import { Transition } from '@headlessui/react'

type TProps = {
  loading: boolean
}
const RightBar: FunctionComponent<TProps & PropsWithChildren> = ({loading, children}) => {
  return (
    <div className={`fixed z-50 top-28 right-6 pt-5 w-1/4`}>
      <Transition
        show={!loading}
        enter={'transition-all duration-1000'}
        enterFrom={'-top-10 opacity-0'}
        enterTo={'top-0 opacity-100'}
        leave={'transition-all duration-1000'}
        leaveFrom={'top-0 opacity-100'}
        leaveTo={'-top-10 opacity-0'}
      >
        {children}
      </Transition>
    </div>
  )
}

export default RightBar