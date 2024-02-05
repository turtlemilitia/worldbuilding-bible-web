import { TFields } from '../InfoBar'
import { useFormHandlingProps } from '../../utils/hooks/useFormHandling'

export type TPostProps<T> = useFormHandlingProps<T> & {
  pageTypeName?: string;
  contentPlaceholder?: string;

  // API
  ready: boolean;

  // form
  fields: TFields[];

  // image
  allowProfileImage?: boolean
  onImageSelected?: (imageId: number, imageType?: string) => Promise<any>;
  coverImageUrl?: string;
  profileImageUrl?: string;
}