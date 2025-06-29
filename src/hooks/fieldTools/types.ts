import { TSelectOption } from '@/components/Forms/Fields/FieldMapper'
import { FunctionComponent } from 'react'
import { TTypesAllowedString, TUser } from '@/types'
import { LucideIcon } from 'lucide-react'

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
  type: 'multiSelect' | 'editor',
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
  link?: (id: number) => string,
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

export type TDialogTypes = TTypesAllowedString;
export type TSelectDialogProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any,
  id: string | number,
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
export type TMultiEditorFieldProps = TMultiSelectFieldProps & {
  Icon: LucideIcon
}

export type TSelectFieldProps = {
  required?: TMultiSelectField['required'],
  options: TMultiSelectField['options']
  link?: TAsyncMultiSelectField['link']
}

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
  link?: (id: number) => string,
} | {
  type: 'select'
  options?: TSelectOption[],
  link?: (id: number) => string,
} | TMultiSelectField | {
  type: 'asyncMultiSelect' | 'asyncSelect'
  dialogType?: TDialogTypes
  options?: TSelectOption[],
  link?: (id: number) => string,
  search: (term: string) => Promise<TSelectOption[]>
} | TDatepickerField
  | {
  type: 'callback'
  Callback: FunctionComponent,
} | {
  type: 'listAdd',
} | {
  type: 'editor',
  dialogType?: TDialogTypes
  link?: (id: number) => string,
  options?: TSelectOption[],
  Icon: LucideIcon
} | {
  type: 'listAddUsers',
  users: TUser[],
  onSubmit: (email:string) => any
})