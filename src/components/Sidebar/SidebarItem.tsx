import { FunctionComponent, JSX, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SidebarItemInterface } from './Sidebar'
import { ChevronDownIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import LoadingSpinner from '../LoadingSpinner'
import { Button } from '@headlessui/react'
import SmallSansSerifText from '@/components/SmallSansSerifText'

interface TProps {
  item: SidebarItemInterface;
}

const SidebarItem: FunctionComponent<TProps> = ({ item }: TProps): JSX.Element => {

  const {
    title,
    subtitle,
    done,
    to,
    icon,
    addNewLink,
    addNewLinkState,
    hasChildren,
    children,
    loadChildren,
    startOpen,
    onDelete
  } = item
  const canAddNew: boolean = Boolean(addNewLink)
  const canDelete: boolean = Boolean(onDelete)
  const collapsable: boolean = Boolean(hasChildren || (children?.length && children.length > 0))

  const [loadingChildren, setLoadingChildren] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(startOpen ?? false)

  const handleOpenChildren = () => {
    if (!open) {
      if (!children?.length && loadChildren) {
        setLoadingChildren(true)
        loadChildren()
      }
    }
    setOpen(prev => !prev)
  }

  const handleOnDelete = () => {
    if (canDelete && onDelete) {
      setDeleting(true)
      onDelete()
        .then(() => {
          setDeleting(false)
        })
        .catch(() => {
          setDeleting(false)
          // todo need to handle dependencies
        })
    }
  }

  useEffect(() => {
    if (children?.length) {
      setLoadingChildren(false)
    }
  }, [children?.length])

  const Content = () => (
    <>
      {icon && (
        <span className="w-6">{icon({ color: 'white', size: 14, className: 'inline-block mr-3' })}</span>
      )}
      <span className={done ? 'line-through' : ''}>{title}
        {subtitle && (
          <SmallSansSerifText className="inline opacity-50 ml-2">
            {subtitle}
          </SmallSansSerifText>
        )}
      </span>
    </>
  )

  return (
    <li className="my-3">
      <div className="flex justify-between">
        {to ? (
          <NavLink
            to={to}
            className={({ isActive }) =>
              `flex items-center hover:text-amber-500 ${isActive ? 'text-amber-500' : ''}`
            }
          >
            <Content />
          </NavLink>
        ) : (
          <div className="flex items-center">
            <Content />
          </div>
        )}
        {(canAddNew || collapsable || onDelete) && (
          <div className="flex">
            {collapsable && (
              <Button
                className={`${!open && '-scale-y-100'} transition-transform duration-1000`}
                onClick={handleOpenChildren}
              >
                <ChevronDownIcon className="h-5"/>
              </Button>
            )}
            {canAddNew && addNewLink && (
              <Button>
                <Link
                  to={addNewLink}
                  state={addNewLinkState}
                >
                  <PlusIcon className="h-5"/>
                </Link>
              </Button>
            )}
            {canDelete && (
              !deleting ? (
              <Button onClick={handleOnDelete}>
                <Trash2Icon className="h-4 text-stone-400"/>
              </Button>
              ) : (
              <LoadingSpinner size={20}/>
              )
            )}
          </div>
        )}
      </div>
      {children && open && (
        <ul className="ml-1.5 pl-3 border-l border-l-yellow-500">
          {children
            .sort((a, b) => Number(Boolean(a.done)) - Number(Boolean(b.done)))
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((item, index) => {
              return <SidebarItem item={item} key={index}/>
            })}
        </ul>
      )}
      {loadingChildren && (
        <div className="flex justify-center">
          <LoadingSpinner/>
        </div>
      )}
    </li>
  )
}

export default SidebarItem