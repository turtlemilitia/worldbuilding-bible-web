import { TSelectOption } from '../Forms/Fields/FieldMapper'

export type TFields = {
  name: string,
  label: string,
  type: string,
  options?: TSelectOption[],
  search?: (term: string) => Promise<TSelectOption[]>
  link?: (id: number|string) => string
}

export type TInfoBarProps<T> = {
  loading: boolean;
  onChange: (key: string, value: any) => void;
  data: T;
  fields: TFields[],
  profileImage?: string
  onProfileImageSelected?: (imageId: number) => Promise<any>;
}