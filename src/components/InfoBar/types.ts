import { TSelectOption } from '../Forms/Fields/FieldMapper'
import { FunctionComponent } from 'react'

export type TFields = {
  name: string,
  label: string,
  type: 'text'|'number'|'email'|'password'|'list'|'listAdd'|'select'|'asyncSelect'|'asyncMultiSelect'|'multiSelect'|'callback'
  options?: TSelectOption[],
  search?: (term: string) => Promise<TSelectOption[]>
  link?: (id: number|string) => string,
  Callback?: FunctionComponent,
  required?: boolean,
}

export type TInfoBarProps<T> = {
  loading: boolean;
  onChange: (key: string, value: any) => void;
  data: T;
  fields: TFields[],
  profileImage?: string
  onProfileImageSelected?: (imageId: number) => Promise<any>;
}