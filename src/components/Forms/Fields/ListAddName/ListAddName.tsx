import { PlusIcon } from 'lucide-react'
import React, { FunctionComponent, useState } from 'react'
import { TListAddProps } from './types'
import { Field } from '@headlessui/react'
import Label from '../Label'

const ListAddName: FunctionComponent<TListAddProps> = ({ label, required, value, onSubmit, link, disabled }) => {

  const [textValue, setTextValue] = useState('')

  const handleOnSubmit = () => {
    onSubmit({ name: textValue })
  }

  return (
    <Field>
      <Label required={required && !disabled}>{label}</Label>
      <div className="relative w-full py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800">
        <div>
          <>
            {value && value.length > 0 ? (
              <ul>
                {value.map((item) => (
                  <li key={item.id} className="py-1">
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-stone-500 italic">Nothing here</div>
            )}
            <div className="w-full flex gap-2 justify-between py-2 rounded-lg focus:bg-stone-800">
              <input type="text" className="w-full bg-transparent outline-none" value={textValue}
                     onChange={(e) => setTextValue(e.target.value)} disabled={disabled}/>
              {!disabled && (
                <button type="button" className="outline-none" onClick={handleOnSubmit}>
                  <PlusIcon className={'text-stone-300 h-5 w-5'}/>
                </button>
              )}
            </div>
          </>
        </div>
      </div>
    </Field>
  )
}

export default ListAddName