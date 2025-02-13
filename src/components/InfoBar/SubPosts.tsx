import { TField } from '@/hooks/fieldTools'
import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import { TDialogTypes } from '@/hooks/fieldTools/types'
import { useEncounterForm, useNoteForm, usePostForm } from '@/hooks/Forms'
import { TGenericPost } from '@/types'
import React, { JSX } from 'react'
import { TPostProps } from '@/components/Post/types'
import { Editor } from '@/components/Forms/Fields/Editor'
import { FloatingBox } from '@/components/FloatingBox'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'
import SansSerifText from '@/components/SmallSansSerifText'

type TProps = TField & {
  type: 'editor',
  currentValue?: TSelectOption[],
  onChange: (name: string, value: any) => any,
  disabled?: boolean;
  dialogType?: TDialogTypes;
}

const SubPost = <T extends TGenericPost, > ({ form }: TPostProps<T>): JSX.Element => {
  return <>
    <input
      className="py-5 text-xl font-sans-serif tracking-widest uppercase content-center text-stone-400 w-full bg-transparent outline-none"
      value={form.data?.name}
      onChange={(value) => form.onFieldChange('name', value.target.value)}
    />
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

function NoteSubPost ({ noteId }: { noteId: number }) {
  const form = useNoteForm({ noteId })
  return <SubPost
    form={form}
  />
}
function EncounterSubPost ({ encounterId }: { encounterId: number }) {
  const {campaign} = useCurrentCampaign()
  const form = useEncounterForm({ encounterId, campaignId: campaign?.id })
  return <SubPost
    form={form}
  />
}

const SubPosts = ({ currentValue, dialogType }: TProps) => {
  return <TabGroup>
    <TabList className={'flex gap-4'}>
      {currentValue?.map((option, index) => {
        return <Tab
          className={clsx(
            'block py-2 p-4 pr-3',
            'h-8',
            'border border-transparent',
            'rounded-full',
            'text-white',
            'transition-all ease-in-out duration-500','data-[hover]:border-yellow-500',
            'data-[hover]:bg-stone-400 data-[hover]:bg-opacity-10 data-[hover]:backdrop-blur-sm',
            'data-[selected]:shadow-md data-[selected]:shadow-stone-950',
            'data-[selected]:bg-yellow-500 data-[selected]:bg-opacity-50 data-[selected]:backdrop-blur-sm'
          )}
        ><SansSerifText>{option.name}</SansSerifText></Tab>
      })}
    </TabList>
    <TabPanels>
    {currentValue?.map(value => {
      switch (dialogType) {
        case 'note':
          return <TabPanel><NoteSubPost noteId={value.id}/></TabPanel>
        case 'encounter':
          return <TabPanel><EncounterSubPost encounterId={value.id}/></TabPanel>
        default:
          return <></>
      }
    })}
    </TabPanels>
  </TabGroup>
}

export default SubPosts