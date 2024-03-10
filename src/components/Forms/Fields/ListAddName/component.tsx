import { PlusIcon } from 'lucide-react'
import React, { FunctionComponent, useState } from 'react'
import { TListAddProps } from './types'

const ListAddName: FunctionComponent<TListAddProps> = ({ value, onSubmit, link }) => {

  const [textValue, setTextValue] = useState('')

  const handleOnSubmit = () => {
    onSubmit({ name: textValue })
  }

  return (
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
            <input type="text" className="w-full bg-transparent outline-none" value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
            <button type="button" className="outline-none" onClick={handleOnSubmit}>
              <PlusIcon className="text-stone-300" size={15}/>
            </button>
          </div>
        </>
      </div>
    </div>
  )
}

export default ListAddName