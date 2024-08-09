import { TSelectOption } from '../FieldMapper'

export type TListAddProps = {
  label: string
  required?: boolean
  value?: TSelectOption[];
  onSubmit: (value: { name: string }) => any;
  link?: (id: number | string) => string;
  disabled?: boolean;
}