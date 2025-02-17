import { TField } from '@/hooks/fieldTools'
import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import { TDialogTypes } from '@/hooks/fieldTools/types'
import { Completable } from '@/types'
import React, { useEffect, useState } from 'react'
import { SmallFloatingBox } from '@/components/FloatingBox'
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import clsx from 'clsx'
import SansSerifText from '@/components/SmallSansSerifText'
import { PlusIcon } from 'lucide-react'
import {
  MultipleSelectSubPost,
} from '@/components/InfoBar/MultipleSelectSubPost'
import { SubPostFactory } from '@/components/InfoBar/SubPostFactory'

type TProps = TField & {
  type: 'editor',
  value: TSelectOption[],
  onChange: (name: string, value: any) => any,
  disabled?: boolean;
  dialogType?: TDialogTypes;
  options?: (TSelectOption)[];
}

const SubPosts = (props: TProps) => {

  const { value, dialogType, label, required, onChange, name, disabled, options } = props

  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  useEffect(() => {
    console.log({ selectedIndex })
  }, [selectedIndex])

  return <>
    <div>
      <h2 className={'mb-4'}><SansSerifText
        size={'normal'}>{label}</SansSerifText></h2>
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList
          className={'h-10 overflow-y-hidden overflow-x-scroll no-scrollbar pl-1 -ml-1 -mr-6 pr-6 flex space-x-4'}>
          {value?.map((option: TSelectOption & Partial<Completable>, index) => {
            return <Tab
              key={option.id}
              className={clsx(
                'block py-2 p-4 pr-3',
                'h-8',
                'border border-transparent',
                'rounded-full text-nowrap',
                'text-white',
                'transition-all ease-in-out duration-500',
                'data-[hover]:border-yellow-500',
                'data-[hover]:bg-stone-400 data-[hover]:bg-opacity-10 data-[hover]:backdrop-blur-sm',
                'data-[selected]:shadow-md data-[selected]:shadow-stone-950',
                'data-[selected]:bg-yellow-500 data-[selected]:bg-opacity-50 data-[selected]:backdrop-blur-sm',
              )}
            ><SansSerifText>{(option.completedAt)
              ? <span className={'line-through'}>{option.name}</span>
              : option.name}</SansSerifText></Tab>
          })}

          <Popover>
            <PopoverButton
              className={'outline-none'}><SmallFloatingBox><PlusIcon size={13}/></SmallFloatingBox></PopoverButton>
            <PopoverPanel anchor={'bottom end'}>
              <MultipleSelectSubPost
                label={label}
                required={required}
                value={value}
                onChange={(value) => onChange(name, value)}
                link={props.link}
                options={options || []}
                dialogType={dialogType}
                disabled={disabled && name !== 'notes'}
                onCreated={() => setSelectedIndex(value.length)}
              />
            </PopoverPanel>
          </Popover>
        </TabList>
        <TabPanels>
          {value?.map(post => (
            <TabPanel key={post.id}>
              <SubPostFactory
                dialogType={dialogType}
                value={post}
                unlink={() => onChange(name, value.filter(item => item.id !== post.id))}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  </>
}

export default SubPosts