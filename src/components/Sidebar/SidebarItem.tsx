import { FunctionComponent, JSX, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SidebarItemInterface } from './Sidebar'
import { ChevronDownIcon, PlusIcon } from 'lucide-react'

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
    children,
    loadChildren,
    startOpen
  } = item
  const canAddNew: boolean = Boolean(addNewLink)
  const collapsable: boolean = Boolean(hasChildren || (children?.length && children.length > 0))

  const [open, setOpen] = useState<boolean>(startOpen || false)

  const handleOpenChildren = () => {
    if (!open) {
      if (!children?.length && loadChildren) {
        loadChildren()
      }
    }
    setOpen(prev => !prev)
  }

  return (
    <li className="my-3">
      <div className="flex justify-between">
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
                onClick={handleOpenChildren}
              >
                <ChevronDownIcon className="h-5"/>
              </button>
            )}
            {canAddNew && addNewLink && (
              <Link
                to={addNewLink}
              >
                <PlusIcon className="h-5"/>
              </Link>
            )}
          </div>
        )}
      </div>
      {children && open && (
        <ul className="pl-3 border-l border-l-yellow-500">
          {children.map((item, index) => {
            return <SidebarItem item={item} key={index}/>
          })}
        </ul>
      )}
    </li>
  )
}

export default SidebarItem