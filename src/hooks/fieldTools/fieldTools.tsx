import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import {
  TAsyncMultiSelectFieldFn,
  TDatepickerField,
  TDatePickerFieldProps, TMultiSelectField,
  TMultiSelectFieldProps,
  TNumberFieldFn,
  TSelectFieldFn,
  TSelectFieldProps,
  TTextFieldFn,
} from './types'
import { Completable, TEncounter, TQuest, TScene } from '@/types'

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
}: TSelectFieldProps) => multiSelectField({
  name: 'notes',
  label: 'Notes',
  required,
  options,
  link,
  dialogType: 'note',
})

export const sessionField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiSelectField({
  name: 'sessions',
  label: 'Sessions',
  required,
  options,
  link,
  dialogType: 'session',
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
}: TSelectFieldProps) => multiSelectField({
  name: 'scenes',
  label: 'Scenes',
  required,
  options: crossOutCompleted(options as TScene[]),
  link,
  dialogType: 'scene'
})

export const questField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiSelectField({
  name: 'quests',
  label: 'Quests',
  required,
  options: crossOutCompleted(options as TQuest[]),
  link,
  dialogType: 'quest'
})

export const encounterField = ({
  required,
  options,
  link,
}: TSelectFieldProps) => multiSelectField({
  name: 'encounters',
  label: 'Encounters',
  required,
  options: crossOutCompleted(options as TEncounter[]),
  link,
  dialogType: 'encounter'
})

// other generic fields
export const factionField = ({
  required,
  options,
  link
}: TSelectFieldProps) => multiSelectField({
  name: 'factions',
  label: 'Factions',
  required,
  options,
  link,
  dialogType: 'faction'
})

// other generic fields
export const locationField = ({
  required,
  options,
  link
}: TSelectFieldProps) => multiSelectField({
  name: 'locations',
  label: 'Locations',
  required,
  options,
  link,
  dialogType: 'location'
})

export const characterField = ({
  required,
  options,
  link
}: TSelectFieldProps) => multiSelectField({
  name: 'characters',
  label: 'Characters',
  required,
  options,
  link,
  dialogType: 'character'
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
