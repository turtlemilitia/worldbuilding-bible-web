import { TGenericPost } from '@/types'
import { TPostProps } from '@/components/Post/types'
import React, { JSX, useState } from 'react'
import { FloatingBox, SmallFloatingBox } from '@/components/FloatingBox'
import { Editor } from '@/components/Forms/Fields/Editor'
import {
  ExternalLinkIcon,
  UnlinkIcon,
} from 'lucide-react'
import { Button } from '@headlessui/react'
import Dialog from '@/components/Dialogs'
import { TDialogTypes } from '@/hooks/fieldTools/types'

type TProps = {
  unlink: () => any,
  disabled?: boolean,
}
export const SubPost = <T extends TGenericPost, > ({ form, unlink, disabled }: TPostProps<T> & TProps): JSX.Element => {

  const [dialogIsOpen, setDialogIsOpen] = useState<number | false>(false)

  return <>
    <div className={'flex'}>
      <input
        className="py-5 text-xl font-sans-serif tracking-widest uppercase content-center text-stone-400 w-full bg-transparent outline-none"
        value={form.data?.name}
        onChange={(value) => form.onFieldChange('name', value.target.value)}
      />
      <div className={'flex items-center gap-4'}>
        <Button onClick={() => setDialogIsOpen(form.data!.id)}>
          <SmallFloatingBox hover>
            <ExternalLinkIcon className="stroke-stone-400 h-5 w-5"/>
          </SmallFloatingBox>
        </Button>
        {!disabled &&
          <Button onClick={unlink}>
            <SmallFloatingBox hover>
              <UnlinkIcon className="stroke-stone-400 h-5 w-5"/>
            </SmallFloatingBox>
          </Button>
        }
      </div>
    </div>
    {form.data && (
      <FloatingBox color={'solid'} border={'yellow'}>
        <Editor
          key={form.data.id + (dialogIsOpen ? 1 : 0)}/* This will ensure the editor will update when the dialog is closed */
          initialValue={form.data.content}
          onChange={(value) => form.onFieldChange('content', value)}
          canEdit={form.canEdit}
        />
      </FloatingBox>
    )}
    {dialogIsOpen && (
      <Dialog
        type={form.entityName as TDialogTypes}
        isOpen={!!dialogIsOpen}
        setIsOpen={() => setDialogIsOpen(false)}
        id={dialogIsOpen}
        onDeleted={/*todo*/() => {}}
      />
    )}
  </>
}