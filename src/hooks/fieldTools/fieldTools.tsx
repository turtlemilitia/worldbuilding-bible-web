import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import {
  TAsyncMultiSelectFieldFn,
  TDatepickerField,
  TDatePickerFieldProps, TMultiEditorFieldProps, TMultiSelectField,
  TMultiSelectFieldProps,
  TNumberFieldFn,
  TSelectFieldFn,
  TSelectFieldProps,
  TTextFieldFn,
} from './types'
import { Completable, TEncounter, TQuest, TScene } from '@/types'
import {
  BadgeIcon, DramaIcon, ListIcon, MapPinIcon,
  PenIcon, StarIcon,
  StarsIcon,
  StickyNoteIcon,
  SwordIcon, UserIcon,
} from 'lucide-react'

export const textField: TTextFieldFn = (props) => ({
  ...props,
  type: 'text',
})
export const numberField: TNumberFieldFn = (props) => ({
  ...props,
  type: 'number',
})
export const selectField: TSelectFieldFn = (props) => ({
  ...props,
  type: 'select',
})
export const multiSelectField = (props: TMultiSelectFieldProps): TMultiSelectField => ({
  ...props,
  type: 'multiSelect',
})
export const multiEditorField = (props: TMultiEditorFieldProps): TMultiSelectField => ({
  ...props,
  type: 'editor',
})
export const asyncMultiSelectField: TAsyncMultiSelectFieldFn = (props) => ({
  ...props,
  type: 'asyncMultiSelect',
})
export const datePickerField = (props: TDatePickerFieldProps): TDatepickerField => ({
  ...props,
  type: 'datePicker',
  formatString: props.formatString || 'yyyy-M-d H:m:s'
})

// other generic fields
export const noteField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiEditorField({
  name: 'notes',
  label: 'Notes',
  required,
  options,
  link,
  dialogType: 'note',
  Icon: PenIcon
})

export const sessionField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiEditorField({
  name: 'sessions',
  label: 'Sessions',
  required,
  options,
  link,
  dialogType: 'session',
  Icon: ListIcon
})

export const crossOutCompleted = (options: (TSelectOption & Completable)[]) => {
  return options.map(({ name, ...option }) => ({
    ...option,
    name,
    label: option.completedAt ? <span className={'line-through'}>{name}</span> : name
  }));
}

export const sceneField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiEditorField({
  name: 'scenes',
  label: 'Scenes',
  required,
  options: crossOutCompleted(options as TScene[]),
  link,
  dialogType: 'scene',
  Icon: DramaIcon
})

export const questField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiEditorField({
  name: 'quests',
  label: 'Quests',
  required,
  options: crossOutCompleted(options as TQuest[]),
  link,
  dialogType: 'quest',
  Icon: StarIcon
})

export const encounterField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiEditorField({
  name: 'encounters',
  label: 'Encounters',
  required,
  options: crossOutCompleted(options as TEncounter[]),
  link,
  dialogType: 'encounter',
  Icon: SwordIcon
})

// other generic fields
export const factionField = ({
  required,
  options,
  link
}: TSelectFieldProps) => multiEditorField({
  name: 'factions',
  label: 'Factions',
  required,
  options,
  link,
  dialogType: 'faction',
  Icon: BadgeIcon
})

// other generic fields
export const locationField = ({
  required,
  options,
  link
}: TSelectFieldProps) => multiEditorField({
  name: 'locations',
  label: 'Locations',
  required,
  options,
  link,
  dialogType: 'location',
  Icon: MapPinIcon
})

export const characterField = ({
  required,
  options,
  link
}: TSelectFieldProps) => multiEditorField({
  name: 'characters',
  label: 'Characters',
  required,
  options,
  link,
  dialogType: 'character',
  Icon: UserIcon
})

export const languageField = ({
  required,
  options,
  link
}: TSelectFieldProps) => multiSelectField({
  name: 'languages',
  label: 'Languages',
  required,
  options,
  link,
  dialogType: 'language'
})
