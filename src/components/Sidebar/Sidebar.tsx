import {JSX} from "react";
import {NavLink} from "react-router-dom";
import {LucideProps} from "lucide-react";

export interface SidebarItemInterface {
  title: string;
  to: string;
  icon?: (props: LucideProps) => JSX.Element,
  children?: SidebarItemInterface[];
}

interface TOwnProps {
  title: string;
  items: SidebarItemInterface[]
}

const Sidebar = ({title, items}: TOwnProps): JSX.Element => {
  return (
    <div className="fixed top-14 left-0 pt-5 pl-5 h-screen">
      <div className="scroll-auto rounded-3xl bg-stone-900 border border-stone-700 w-80 py-6 px-10 text-stone-300">
        <h2 className="text-xl">{title}</h2>
        <div className="mt-5">
          {items.map((item) => {
            return <NavLink to={item.to} className={({isActive}) => isActive ? "font-bold" : ''}>
              <>
                {item.icon && item.icon({color: 'white', size: 14, className: 'inline-block mr-3'})}{item.title}
              </>
            </NavLink>
          })}
        </div>
      </div>
    </div>
  )
}

export default Sidebar