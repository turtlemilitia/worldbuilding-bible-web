import React, { Fragment, JSX } from 'react'
import DropdownItem from './DropdownItem'
import { MenuItemInterface } from './Menu'
import { Transition } from '@headlessui/react'

interface DropdownParams {
  menuItems: MenuItemInterface[],
  show: boolean
}

const Dropdown = ({ menuItems, show }: DropdownParams): JSX.Element => {

  const rounded = menuItems.length > 1 ? 'rounded-xl' : 'rounded-full'

  return (
    <Transition
      as={Fragment}
      show={show}
      enter={'transition-all duration-1000'}
      enterFrom={'top-0 -z-10 opacity-0'}
      enterTo={'top-12 z-10 opacity-100'}
      leave={'transition-all duration-1000'}
      leaveFrom={'top-12 z-10 opacity-100'}
      leaveTo={'top-0 -z-10 opacity-0'}
    >
      <div
        className={`absolute left-1/2 -translate-x-1/2`}>
        <ul
          className={`bg-stone-800 divide-y divide-stone-300 ${rounded} overflow-hidden shadow text-sm text-stone-700`}>
          {menuItems.map((menuItem, index) => {

            const isLastAndNew = (menuItems.length - 1 === index) && (menuItem.to.indexOf('new') !== -1)
            const hasBorder = menuItems.length > 1 && isLastAndNew

            return (
              <div
                className={`${hasBorder ? 'border-t border-t-stone-500' : (index !== 0 && 'border-t border-stone-700')}`}
                key={index}>
                <DropdownItem
                  menuItem={menuItem}
                  key={index}
                />
              </div>
            )
          })}
        </ul>
      </div>
    </Transition>
  )
}

export default Dropdown