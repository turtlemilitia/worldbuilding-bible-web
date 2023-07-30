import { FunctionComponent, JSX, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SidebarItemInterface } from './Sidebar'
import { ChevronDown, Plus } from 'lucide-react'

interface TProps {
  item: SidebarItemInterface;
}

const SidebarItem: FunctionComponent<TProps> = ({ item }: TProps): JSX.Element => {

  const {
    title,
    to,
    icon,
    addNewLink,
    hasChildren,
    children
  } = item
  const canAddNew: boolean = Boolean(addNewLink)
  const collapsable: boolean = Boolean(hasChildren)

  const [open, setOpen] = useState<boolean>(false)

  return (
    <li className="my-3 text-sm flex justify-between">
      {to ? (
        <NavLink to={to} className={({ isActive }) => isActive ? 'font-bold' : ''}>
          {icon && icon({ color: 'white', size: 14, className: 'inline-block mr-3' })}{title}
        </NavLink>
      ) : (
        <div>
          {icon && icon({ color: 'white', size: 14, className: 'inline-block mr-3' })}{title}
        </div>
      )}
      {(canAddNew || collapsable) && (
        <div className="flex">
          {collapsable && (
            <button
              className={`${!open && '-scale-y-100'} transition-transform duration-1000`}
              onClick={() => setOpen(prev => !prev)}
            >
              <ChevronDown className="h-5"/>
            </button>
          )}
          {canAddNew && addNewLink && (
            <Link
              to={addNewLink}
            >
              <Plus className="h-5"/>
            </Link>
          )}
        </div>
      )}
    </li>
  )
}

export default SidebarItem