import { TField } from '@/hooks/fieldTools'
import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import { TDialogTypes } from '@/hooks/fieldTools/types'
import {
  useEncounterForm,
  useNoteForm,
  useQuestForm,
  useSceneForm,
} from '@/hooks/Forms'
import { Completable, TGenericPost } from '@/types'
import React, { Fragment, JSX, useState } from 'react'
import { TPostProps } from '@/components/Post/types'
import { Editor } from '@/components/Forms/Fields/Editor'
import { FloatingBox, SmallFloatingBox } from '@/components/FloatingBox'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import {
  Button,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Popover,
  PopoverButton,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from '@headlessui/react'
import clsx from 'clsx'
import SansSerifText from '@/components/SmallSansSerifText'
import { CheckIcon, ChevronDownIcon, DotIcon, PlusIcon } from 'lucide-react'
import Dialog from '@/components/Dialogs'

type TProps = TField & {
  type: 'editor',
  value?: TSelectOption[],
  onChange: (name: string, value: any) => any,
  disabled?: boolean;
  dialogType?: TDialogTypes;
  options?: (TSelectOption)[];
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
  const { campaign } = useCurrentCampaign()
  const form = useEncounterForm({ encounterId, campaignId: campaign?.id })
  return <SubPost
    form={form}
  />
}

function SceneSubPost ({ sceneId }: { sceneId: number }) {
  const { campaign } = useCurrentCampaign()
  const form = useSceneForm({ sceneId, campaignId: campaign?.id })
  return <SubPost
    form={form}
  />
}

function QuestSubPost ({ questId }: { questId: number }) {
  const { campaign } = useCurrentCampaign()
  const form = useQuestForm({ questId, campaignId: campaign?.id })
  return <SubPost
    form={form}
  />
}

function MultipleSelectSubPost ({
  value = [],
  onChange,
  options,
  disabled,
  dialogType,
}: {
  label: string;
  required?: boolean;
  value?: TSelectOption[];
  onChange: (value: TSelectOption[]) => any;
  options: (TSelectOption)[];
  link?: (id: number) => string;
  disabled?: boolean;
  dialogType?: TDialogTypes;
}) {

  const [query, setQuery] = useState('')
  const [dialogIsOpen, setDialogIsOpen] = useState<number | 'new' | false>(
    false)

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
        return option?.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Field className="relative w-full mt-4 py-2 px-4 rounded-lg bg-stone-800 border-stone-200 text-stone-200">
      <Combobox value={value} by="id" onChange={onChange} multiple disabled={disabled}>
        {({ open }) => (
          <>
            <div className="w-full flex justify-between py-2 rounded-lg focus:bg-stone-800">
              <ComboboxButton className="w-full flex justify-between">
                <ComboboxInput
                  className="w-full bg-transparent outline-none"
                  onChange={(event) => setQuery(event.target.value)}
                  displayValue={(option: TSelectOption) => option?.name}/>
                {!disabled && (
                  <ChevronDownIcon className="text-stone-300 h-5 w-5"/>
                )}
              </ComboboxButton>
              {dialogType && (
                <PlusIcon
                  className="text-stone-300 h-5 w-5 cursor-pointer"
                  onClick={() => setDialogIsOpen('new')}
                />
              )}
            </div>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ComboboxOptions
                anchor={'top end'}
                className="outline-none h-96">
                <FloatingBox color={'solid'}>
                  {!filteredOptions.length && (
                    <li className="py-1 text-stone-600">No results
                      found.</li>
                  )}
                  {filteredOptions.map((option) => (
                    <ComboboxOption
                      key={option.id}
                      value={option}
                      as={Fragment}
                    >
                      {({ focus, selected }) => (
                        <li
                          className={`py-1 flex justify-between cursor-pointer`}>
                          {option.label ?? option.name}
                          {selected &&
                            <CheckIcon className="text-stone-300 h-5 w-5"/>}
                          {!selected && focus &&
                            <DotIcon className="text-stone-300 h-5 w-5"/>}
                        </li>
                      )}
                    </ComboboxOption>
                  ))}
                </FloatingBox>
              </ComboboxOptions>
            </Transition>
          </>
        )}
      </Combobox>
      {dialogIsOpen && dialogType && (
        <Dialog
          type={dialogType}
          isOpen={!!dialogIsOpen}
          setIsOpen={(isOpen) => setDialogIsOpen(isOpen ? 'new' : false)}
          id={dialogIsOpen}
          onCreated={(data) => {
            setDialogIsOpen(data.id)
            onChange([...value, data])
          }}
          onUpdated={(data) => {
            onChange(value.map(single => single.id === data.id ? data : single))
          }}
          onDeleted={(id) => {
            onChange(value.filter(single => single.id !== id))
          }}
        />
      )}
    </Field>
  )
}

const SubPosts = (props: TProps) => {

  const { value, dialogType, label, required, onChange, name, disabled, options } = props

  return <>
    <div>
      <h2 className={'mb-4'}><SansSerifText size={'normal'}>{label}</SansSerifText></h2>
      <TabGroup>
        <TabList
          className={'h-10 overflow-y-hidden overflow-x-scroll no-scrollbar pl-1 -ml-1 -mr-6 pr-6 flex space-x-4'}>
          {value?.map((option: TSelectOption & Partial<Completable>, index) => {
            return <Tab
              key={index}
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
              />
            </PopoverPanel>
          </Popover>
        </TabList>
        <TabPanels>
          {value?.map(value => {
            switch (dialogType) {
              case 'note':
                return <TabPanel><NoteSubPost noteId={value.id}/></TabPanel>
              case 'encounter':
                return <TabPanel><EncounterSubPost
                  encounterId={value.id}/></TabPanel>
              case 'scene':
                return <TabPanel><SceneSubPost sceneId={value.id}/></TabPanel>
              case 'quest':
                return <TabPanel><QuestSubPost questId={value.id}/></TabPanel>
              default:
                return <></>
            }
          })}
        </TabPanels>
      </TabGroup>
    </div>
  </>
}

export default SubPosts