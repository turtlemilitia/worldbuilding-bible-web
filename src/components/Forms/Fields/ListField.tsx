import React, { FunctionComponent } from 'react'
import { TSelectOption } from './FieldMapper'
import { Link } from 'react-router-dom'
import Label from './Label'
import { Field } from '@headlessui/react'

type TProps = {
  label: string
  required?: boolean
  value?: TSelectOption[];
  link?: (id: number | string) => string
}
const ListField: FunctionComponent<TProps> = ({ value, link, required, label }) => {
  return (
    <Field>
      <Label required={required}>
        {label}
      </Label>
      <div
        className={'w-full flex justify-between py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800'}>
        {value && value.length > 0 ? (
          <ul>
            {value.map((item) => (
              <li key={item.id} className="py-1">
                {link ? <Link to={link(item.slug ?? item.id)}>{item.name}</Link> : item.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-stone-500 italic">Nothing here</div>
        )}
      </div>
    </Field>
  )
}

export default ListField