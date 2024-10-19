import React, { JSX } from 'react'
import DropdownItem from './DropdownItem'
import { Transition } from '@headlessui/react'
import { MenuItemInterface } from './MenuItemInterface'
import clsx from "clsx";

interface DropdownParams {
  menuItems: MenuItemInterface[],
  show: boolean
}

const Dropdown = ({ menuItems, show }: DropdownParams): JSX.Element => {

  const rounded = (menuItems.length > 1 || !menuItems[0].to.includes('new')) ? 'rounded-xl' : 'rounded-full'

  return (
    <Transition show={show}>
      <div
        className={clsx([
            `absolute left-1/2 -translate-x-1/2 transition duration-1000 z-10 top-12`,
            `data-[closed]:opacity-0`,
            `data-[enter]:data-[closed]:-translate-y-full`,
            `data-[leave]:data-[closed]:-translate-y-full`
        ])}>
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