import React, { FunctionComponent } from 'react'
import { Combobox } from '@headlessui/react'
import { TSelectOption } from './FieldMapper'
import { Link } from 'react-router-dom'

type TProps = {
  value?: TSelectOption[];
  link?: (id: number|string) => string

}
const ListField: FunctionComponent<TProps> = ({value, link}) => {
  return (
    <div>
      {value && value.length > 0 ? (
        <ul>
          {value.map((item) => (
            <li key={item.id} className="py-1">
              {link ? <Link to={link(item.id)}>{item.name}</Link> : item.name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-stone-500 italic">Nothing here</div>
      )}
    </div>
  )
}

export default ListField;