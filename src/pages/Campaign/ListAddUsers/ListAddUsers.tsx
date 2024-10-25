import { PlusIcon } from 'lucide-react'
import React, { FunctionComponent, useState } from 'react'
import { TListAddUsersProps } from './types'
import LoadingSpinner from '../../../components/LoadingSpinner'
import { Field } from '@headlessui/react'
import Label from '@/components/Forms/Fields/Label'

const ListAddUsers: FunctionComponent<TListAddUsersProps> = ({ users, invitations, onSubmit }) => {

  const [loading, setLoading] = useState(false)
  const [textValue, setTextValue] = useState('')

  const handleOnSubmit = () => {
    setLoading(true)
    onSubmit(textValue)
      .then(() => {
        setLoading(false);
        setTextValue('')
      })
  }

  const all = [...users, ...invitations]

  return (
    <Field className="relative w-full py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800">
      <Label>Add Users to Campaign</Label>
      <div>
        <>
          {all.length > 0 && (
            <ul>
              {all.map((item) => (
                <li key={item.id} className="py-1">
                  {
                    // @ts-ignore
                    item.name ?? item.email
                  }
                </li>
              ))}
            </ul>
          )}
          <div className="w-full flex gap-2 justify-between py-2 rounded-lg focus:bg-stone-800">
            <input type="text" className="w-full bg-transparent outline-none" value={textValue} onChange={(e) => setTextValue(e.target.value)}/>
            <button type="button" className="outline-none" onClick={handleOnSubmit}>
              {loading ? <LoadingSpinner size={15}/> : <PlusIcon className="text-stone-300" size={15}/>}
            </button>
          </div>
        </>
      </div>
    </Field>
  )
}

export default ListAddUsers