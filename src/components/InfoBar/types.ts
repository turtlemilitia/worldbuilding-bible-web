import { TField } from '../../hooks/fieldTools'

export type TInfoBarProps<T> = {
  onChange: (key: string, value: any) => void;
  data: T;
  fields?: TField[],
  profileImage?: string
  canHaveProfileImage?: boolean;
  onProfileImageSelected?: (imageId: number) => Promise<any>;
  disabled?: boolean
}
