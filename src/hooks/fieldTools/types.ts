import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import { FunctionComponent } from 'react'
import { TGenericPostBasic, TUser } from '@/types'

type TGenericFieldParams = {
  name: string,
  label: string,
  required?: boolean
}
export type TTextField = TGenericFieldParams & {
  type: 'text'
}
export type TTextFieldFn = (props: {
  name: TTextField['name'],
  label: TTextField['label'],
  required?: TTextField['required']
}) => TTextField

type TNumberField = TGenericFieldParams & {
  type: 'number'
}
export type TNumberFieldFn = (props: {
  name: TNumberField['name'],
  label: TNumberField['label'],
  required?: TNumberField['required']
}) => TNumberField

export type TSelectField = TGenericFieldParams & {
  type: 'select',
  options: TSelectOption[],
}
export type TMultiSelectField = TGenericFieldParams & {
  type: 'multiSelect',
  options: TSelectOption[],
}
export type TSelectFieldFn = (props: {
  name: TSelectField['name'],
  label: TSelectField['label'],
  options: TSelectField['options']
  required?: TSelectField['required']
}) => TSelectField

type TAsyncMultiSelectField = TGenericFieldParams & {
  type: 'asyncMultiSelect',
  link?: (id: number | string) => string,
  search: (term: string) => Promise<TSelectOption[]>
}
export type TAsyncMultiSelectFieldFn = (props: {
  name: TAsyncMultiSelectField['name'],
  label: TAsyncMultiSelectField['label'],
  search: TAsyncMultiSelectField['search'],
  required?: TAsyncMultiSelectField['required']
  link?: TAsyncMultiSelectField['link'],
  dialogType?: TDialogTypes
}) => TAsyncMultiSelectField

export type TDatepickerField = TGenericFieldParams & {
  type: 'datePicker',
  formatString: string
}
export type TDatePickerFieldProps = {
  name: TDatepickerField['name'],
  label: TDatepickerField['label'],
  required?: TDatepickerField['required'],
  formatString?: string
}

export type TDialogTypes =
  'note'
  | 'session'
  | 'quest'
  | 'encounter'
  | 'faction'
  | 'language'
  | 'scene'
  | 'character'
  | 'location';
export type TSelectDialogProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any,
  id?: TGenericPostBasic['id'],
  type: TDialogTypes
  onCreated?: (data: any) => any,
  onUpdated?: (data: any) => any,
  onDeleted?: (id: string | number) => any,
}
export type TMultiSelectFieldProps = {
  name: TSelectField['name'],
  label: TSelectField['label'],
  options: TSelectField['options']
  required?: TSelectField['required']
  link?: TAsyncMultiSelectField['link'],
  dialogType?: TDialogTypes
}

export type TSelectFieldProps = {
  required?: TMultiSelectField['required'],
  options: TMultiSelectField['options']
  link?: TAsyncMultiSelectField['link']
}

export type TFactionFieldFn = <TEntity> (props: {
  required?: TMultiSelectField['required'],
  options: TMultiSelectField['options'],
  link?: TAsyncMultiSelectField['link']
}) => TMultiSelectField

export type TLanguageFieldFn = <TEntity> (props: {
  required?: TMultiSelectField['required'],
  options: TMultiSelectField['options'],
  link?: TAsyncMultiSelectField['link']
}) => TMultiSelectField

export type TField = {
  name: string,
  label: string
  required?: boolean
} & ({
  type: 'text' | 'number' | 'email' | 'password'
} | {
  type: 'dialog'
} | {
  type: 'list'
  dialogType?: TDialogTypes
  link?: (id: number | string) => string,
} | {
  type: 'select'
  options?: TSelectOption[],
  link?: (id: number | string) => string,
} | {
  type: 'multiSelect'
  dialogType?: TDialogTypes
  options?: TSelectOption[],
  link?: (id: number | string) => string,
} | {
  type: 'asyncMultiSelect' | 'asyncSelect'
  dialogType?: TDialogTypes
  options?: TSelectOption[],
  link?: (id: number | string) => string,
  search: (term: string) => Promise<TSelectOption[]>
} | TDatepickerField
  | {
  type: 'callback'
  Callback: FunctionComponent,
} | {
  type: 'listAdd',
} | {
  type: 'listAddUsers',
  users: TUser[],
  onSubmit: (email:string) => any
})