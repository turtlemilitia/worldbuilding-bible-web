import React, { FunctionComponent, JSX } from 'react'
import clsx from 'clsx'
import FieldMapper from '../../components/Forms/Fields/FieldMapper'
import { FloatingBox } from '../FloatingBox'
import { TTypesAllowed } from '@/types'
import ProfileImage from '../ProfileImage'
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from '@headlessui/react'
import { TField } from '@/hooks/fieldTools'
import isEmpty from '@/utils/isEmpty'
import SubPosts from './SubPosts'

type TProps<T> = {
  onChange: (key: string, value: any) => void;
  data: T;
  fields?: TField[],
  profileImage?: string
  canHaveProfileImage?: boolean;
  openProfileImagePicker?: () => any;
  disabled?: boolean
  loading: boolean
  showSubPosts?: boolean;
}

const InfoBar: FunctionComponent<TProps<any>> = ({
  onChange,
  data,
  fields = [],
  profileImage,
  canHaveProfileImage = false,
  openProfileImagePicker,
  disabled,
  loading,
  showSubPosts = false,
}): JSX.Element => {

  const filteredFields = fields.filter((props) => {
    const currentValue = data ? data[props.name as keyof TTypesAllowed] : null
    return (props.name === 'notes' || !(disabled && isEmpty(currentValue)))
  })
  const nonEditorFields = fields.filter((props) => props.type !== 'editor')
  const editorFields = fields.filter((props) => props.type === 'editor')

  return (
    <Transition show={!loading && filteredFields.length > 0}>
      <div className={clsx([
        `transition-all duration-1000`,
        'data-[closed]:-top-10 data-[closed]:opacity-0',,
      ])}>
        {!isEmpty(nonEditorFields) && (
          <FloatingBox className={clsx([
            canHaveProfileImage && openProfileImagePicker ? 'mt-32' : '',
            'max-w-xl ml-auto',
          ])}>
            {canHaveProfileImage && openProfileImagePicker && (
              <ProfileImage image={profileImage}
                            openPicker={openProfileImagePicker}/>
            )}
            <ul
              className="grid font-serif text-serif-md leading-tight overflow-y-scroll overflow-x-clip gap-4">
              {nonEditorFields.map((props, index) => {
                const currentValue = data
                  ? data[props.name as keyof TTypesAllowed]
                  : null
                return <FieldMapper
                  key={index}
                  currentValue={currentValue}
                  onChange={onChange}
                  disabled={disabled}
                  {...props}
                />
              })}
            </ul>
          </FloatingBox>
        )}
        {showSubPosts && (
          <TabGroup className={'relative mt-5 gap-4 min-h-96'}>
            <TabList className={'absolute top-0 left-0'}>
              {editorFields.map(({ Icon }, index) => {
                return <Tab
                  className={clsx(
                    'flex items-center justify-center',
                    'h-8 w-8',
                    'mb-2',
                    'border border-opacity-30 border-stone-400',
                    'rounded-full',
                    'text-stone-200',
                    'bg-stone-400 bg-opacity-10 backdrop-blur-sm',
                    'transition-all ease-in-out duration-500',
                    'data-[hover]:border-yellow-500',
                    'data-[selected]:shadow-md data-[selected]:shadow-stone-950',
                    'data-[selected]:bg-yellow-500 data-[selected]:bg-opacity-50',
                    'outline-none',
                  )}
                ><Icon size={15}/></Tab>
              })}
            </TabList>
            <TabPanels className={'ml-16'}>
              {editorFields.map((props, index) => {
                const currentValue = data
                  ? data[props.name as keyof TTypesAllowed]
                  : null
                return (
                  <TabPanel key={index}>
                    <SubPosts
                      {...props}
                      value={currentValue}
                      onChange={onChange}
                      disabled={disabled || props.options == undefined}
                    />
                  </TabPanel>
                )
              })}
            </TabPanels>
          </TabGroup>
        )}
      </div>
    </Transition>
  )
}

export default InfoBar
