import React, {
  JSX,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react'
import { LucideProps, PlusIcon } from 'lucide-react'
import { FloatingBox } from '../FloatingBox'
import { Link } from 'react-router-dom'
import { useCampaignDataManager } from '../../hooks/DataManagers'

export interface SidebarItemInterface {
  id?: string|number;
  title: string;
  done?: boolean;
  subtitle?: string;
  to?: string;
  icon?: (props: LucideProps) => JSX.Element,
  addNewLink?: string;
  addNewLinkState?: object;
  hasChildren?: boolean;
  children?: SidebarItemInterface[];
  loadChildren?: () => any,
  startOpen?: boolean,
  onDelete?: () => any;
}

interface TOwnProps extends PropsWithChildren {
  title: string;
  addNew?: string,
  canAdd?: boolean
  filters?: JSX.Element[]
}

const Sidebar = ({ title, addNew, canAdd = false, filters, children }: TOwnProps): JSX.Element => {

  const [show, setShow] = useState<boolean>(false)

  const { campaign } = useCampaignDataManager()

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className="relative flex w-full">
      <div className={`fixed z-50 ${campaign ? 'top-28' : 'top-14'} left-0 pt-5 max-h-underScreen w-1/4`}>
        <div
          className={`absolute transition-all duration-1000 ${show ? 'top-5 opacity-100' : '-top-14 opacity-0'} w-full px-6`}>
          <FloatingBox>
            <div className="max-h-underScreen overflow-y-auto">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-sans-serif tracking-widest uppercase content-center text-stone-400">{title}</h2>
                <div className={'flex justify-end'}>
                  {filters}
                  {addNew && canAdd && (
                    <Link to={addNew}
                          className={`block w-7 text-stone-300 text-center content-center ml-1`}>
                      <PlusIcon color="white" className="inline-block"/>
                    </Link>
                  )}
                </div>
              </div>
              {children}
            </div>
          </FloatingBox>
        </div>
      </div>
    </div>
  )
}

export default Sidebar