import { FunctionComponent, JSX, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SidebarItemInterface } from './Sidebar'
import { ChevronDownIcon, PlusIcon, Trash2Icon, TrashIcon } from 'lucide-react'
import LoadingSpinner from '../LoadingSpinner'

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
    startOpen,
    onDelete
  } = item
  const canAddNew: boolean = Boolean(addNewLink)
  const canDelete: boolean = Boolean(onDelete)
  const collapsable: boolean = Boolean(hasChildren || (children?.length && children.length > 0))

  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(startOpen || false)

  const handleOpenChildren = () => {
    if (!open) {
      if (!children?.length && loadChildren) {
        setLoading(true);
        loadChildren()
      }
    }
    setOpen(prev => !prev)
  }

  useEffect(() => {
    if (children?.length) {
      setLoading(false);
    }
  }, [children?.length])

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
        {(canAddNew || collapsable || onDelete) && (
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
            {onDelete && (
              <button onClick={onDelete}>
                <Trash2Icon className="h-4 text-stone-400"/>
              </button>
            )}
          </div>
        )}
      </div>
      {children && open && (
        <ul className="ml-1.5 pl-3 border-l border-l-yellow-500">
          {children.map((item, index) => {
            return <SidebarItem item={item} key={index}/>
          })}
        </ul>
      )}
      {loading && (
        <div className="flex justify-center">
          <LoadingSpinner size={5}/>
        </div>
      )}
    </li>
  )
}

export default SidebarItem