import React, { FunctionComponent, useState } from 'react'
import { TSelectOption } from './FieldMapper'
import { Link } from 'react-router-dom'
import Label from './Label'
import { Button, Field } from '@headlessui/react'
import Dialog from '@/components/Dialogs'
import { TDialogTypes } from '@/hooks/fieldTools/types'
import { Completable } from '@/types'

type TProps = {
  label: string
  required?: boolean
  value?: TSelectOption[];
  link?: (id: number | string) => string
  dialogType?: TDialogTypes;
}
const ListField: FunctionComponent<TProps> = ({ value, link, required, label, dialogType }) => {

  const [dialogIsOpen, setDialogIsOpen] = useState<string | false>(false)

  return (
    <Field>
      <Label required={required}>
        {label}
      </Label>
      <div
        className={'w-full flex justify-between py-2 px-4 rounded-lg bg-stone-700 bg-opacity-50 focus:bg-stone-800'}>
        {value && value.length > 0 ? (
          <ul>
            {value.map(({ id, name, slug }: TSelectOption & Partial<Completable>) => {
              console.log({dialogType, slug})
              return (
                <li key={id} className="py-1">
                  {(dialogType && slug) ? <Button
                      onClick={() => setDialogIsOpen(
                        slug as string)}>{name}</Button>
                    : (link && slug ? <Link
                        to={link(slug as string)}>{name}</Link>
                      : name)}
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="text-stone-500 italic">Nothing here</div>
        )}
      </div>
      {dialogIsOpen && dialogType && (
        <Dialog
          type={dialogType}
          isOpen={!!dialogIsOpen}
          setIsOpen={(isOpen) => setDialogIsOpen(isOpen ? 'new' : false)}
          id={dialogIsOpen || 'new'}
        />
      )}
    </Field>
  )
}

export default ListField