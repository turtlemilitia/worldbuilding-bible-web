import SidebarItem from '@/components/Sidebar/SidebarItem'
import React, { FunctionComponent } from 'react'
import { SidebarItemInterface } from '@/components/Sidebar/Sidebar'
import SansSerifText from '@/components/SmallSansSerifText'
import { Button } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'

type TOwnProps = {
  title?: string;
  addNewLink?: string;
  addNewLinkState?: object
  items: SidebarItemInterface[],
};
const SidebarSection: FunctionComponent<TOwnProps> = ({
  title,
  items,
  addNewLink,
  addNewLinkState,
}) => {
  return (
    <div className={'w-full mb-6'}>
      {title && (
        <div
          className={'flex justify-between border-b border-yellow-500 pb-1'}>
          <SansSerifText size={'normal'} className={'text-emerald-500 font-bold'}>
            {title}
          </SansSerifText>
          {addNewLink && (
            <Button>
              <Link to={addNewLink} state={addNewLinkState}>
                <PlusIcon className="h-5"/>
              </Link>
            </Button>
          )}
        </div>
      )}
      <ul className="font-serif text-serif-md leading-none">
        {items
        .sort((a, b) => Number(Boolean(a.done)) - Number(Boolean(b.done)))
        .map((item, index) => {
          return <SidebarItem item={item} key={index}/>
        })}
      </ul>
    </div>
  )
}

export default SidebarSection