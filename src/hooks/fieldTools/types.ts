import { TSelectOption } from '../../components/Forms/Fields/FieldMapper'
import { FunctionComponent } from 'react'
import { TGenericPostBasic } from '../../types'

type TGenericFieldParams = {
  name: string,
  label: string,
  required?: boolean
}
export type TTextField = TGenericFieldParams & {
  type: 'text'
}
export type TTextFieldFn = (props: { name: TTextField['name'], label: TTextField['label'], required?: TTextField['required']}) => TTextField

type TNumberField = TGenericFieldParams & {
  type: 'number'
}
export type TNumberFieldFn = (props: { name: TNumberField['name'], label: TNumberField['label'], required?: TNumberField['required']}) => TNumberField

type TSelectField = TGenericFieldParams & {
  type: 'select',
  options: TSelectOption[],
}
type TMultiSelectField = TGenericFieldParams & {
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

export type TDialogTypes = 'note';
export type TSelectDialogProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any,
  id: TGenericPostBasic['slug'],
  type: TDialogTypes
  onCreated?: (data: any) => any,
  onUpdated?: (data: any) => any,
  onDeleted?: (id: string|number) => any,
}
export type TMultiSelectFieldFn = (props: {
  name: TSelectField['name'],
  label: TSelectField['label'],
  options: TSelectField['options']
  required?: TSelectField['required']
  link?: TAsyncMultiSelectField['link'],
  dialogType?: TDialogTypes
}) => TMultiSelectField

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
  label: string,
  type: 'text' | 'number' | 'email' | 'password' | 'list' | 'listAdd' | 'select' | 'asyncSelect' | 'asyncMultiSelect' | 'multiSelect' | 'callback'
  options?: TSelectOption[],
  search?: (term: string) => Promise<TSelectOption[]>
  link?: (id: number | string) => string,
  Callback?: FunctionComponent,
  dialogType?: TDialogTypes
  required?: boolean,
}