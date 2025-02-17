import { TGenericPost } from '@/types'
import { TPostProps } from '@/components/Post/types'
import React, { JSX } from 'react'
import { FloatingBox, SmallFloatingBox } from '@/components/FloatingBox'
import { Editor } from '@/components/Forms/Fields/Editor'
import {
  ExternalLinkIcon,
  Link2Off,
  Link2OffIcon,
  LinkIcon,
  RefreshCwIcon,
  UnlinkIcon,
} from 'lucide-react'
import { Button } from '@headlessui/react'
import { Link } from 'react-router-dom'

type TProps = {
  unlink: () => any,
}
export const SubPost = <T extends TGenericPost, > ({ form, unlink }: TPostProps<T> & TProps): JSX.Element => {
  return <>
    <div className={'flex'}>
      <input
        className="py-5 text-xl font-sans-serif tracking-widest uppercase content-center text-stone-400 w-full bg-transparent outline-none"
        value={form.data?.name}
        onChange={(value) => form.onFieldChange('name', value.target.value)}
      />
      <div className={'flex items-center gap-4'}>
        <Link to={!form.isNew ? form.link : ''}>
          <SmallFloatingBox hover><ExternalLinkIcon className="stroke-stone-400 h-5 w-5"/></SmallFloatingBox>
        </Link>
        <Button onClick={unlink}>
          <SmallFloatingBox hover><UnlinkIcon className="stroke-stone-400 h-5 w-5"/></SmallFloatingBox>
        </Button>
      </div>
    </div>
    <FloatingBox color={'solid'} border={'yellow'}>
      <Editor
        key={form.data?.id}
        initialValue={form.data?.content}
        onChange={(value) => form.onFieldChange('content', value)}
        canEdit={form.canEdit}
      />
    </FloatingBox>
  </>
}