import { TSelectOption } from '../FieldMapper'

export type TListAddProps = {
  value?: TSelectOption[];
  onSubmit: (value: { name: string }) => any;
  link?: (id: number | string) => string;
  disabled?: boolean;
}