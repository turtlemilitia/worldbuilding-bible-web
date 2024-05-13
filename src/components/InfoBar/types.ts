import { TField } from '../../hooks/useFields'

export type TInfoBarProps<T> = {
  loading: boolean;
  onChange: (key: string, value: any) => void;
  data: T;
  fields?: TField[],
  profileImage?: string
  onProfileImageSelected?: (imageId: number) => Promise<any>;
  disabled?: boolean
}
