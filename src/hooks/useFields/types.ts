import { TSelectOption } from '../../components/Forms/Fields/FieldMapper'
import { FunctionComponent } from 'react'
import { TCanHaveNotes, TGenericPost, TNotebook } from '../../types'

type TGenericFieldParams = {
  name: string,
  label: string
}
export type TTextField = TGenericFieldParams & {
  type: 'text'
}
export type TTextFieldFn = (props: {name: TTextField['name'], label: TTextField['label']}) => TTextField

type TNumberField = TGenericFieldParams & {
  type: 'number'
}
export type TNumberFieldFn = (props: {name: TNumberField['name'], label: TNumberField['label']}) => TNumberField

type TSelectField = TGenericFieldParams & {
  type: 'select',
  options: TSelectOption[],
}
export type TSelectFieldFn = (props: {name: TSelectField['name'], label: TSelectField['label'], options: TSelectField['options']}) => TSelectField

type TAsyncMultiSelectField = TGenericFieldParams & {
  type: 'asyncMultiSelect',
  link?: (id: number|string) => string,
  search: (term: string) => Promise<TSelectOption[]>
}
export type TAsyncMultiSelectFieldFn = (props: {
    name: TAsyncMultiSelectField['name'],
    label: TAsyncMultiSelectField['label'],
    search: TAsyncMultiSelectField['search'],
    link?: TAsyncMultiSelectField['link'],
  Dialog?: FunctionComponent<{ isOpen: boolean, setIsOpen: (open: boolean) => any, id: TGenericPost['slug'] }>,
}) => TAsyncMultiSelectField

export type TNoteFieldFn = (props: {
  notableType: string,
  notable: TGenericPost & TCanHaveNotes,
  notebookId: TNotebook['slug'],
  onCreated?: (payload: any) => any,
  onUpdated?: (payload: any) => any,
}) => TAsyncMultiSelectField

export type TField = {
  name: string,
  label: string,
  type: 'text'|'number'|'email'|'password'|'list'|'listAdd'|'select'|'asyncSelect'|'asyncMultiSelect'|'multiSelect'|'callback'
  options?: TSelectOption[],
  search?: (term: string) => Promise<TSelectOption[]>
  link?: (id: number|string) => string,
  Callback?: FunctionComponent,
  Dialog?: FunctionComponent<{isOpen: boolean, setIsOpen: (open: boolean) => any, id: TGenericPost['slug']}>,
  required?: boolean,
}