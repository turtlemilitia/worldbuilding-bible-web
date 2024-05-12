import { TField } from '../../hooks/useFields'
import { useFormHandlingProps } from '../../hooks/useFormHandling'

export type TPostProps<T> = useFormHandlingProps<T> & {
  pageTypeName?: string;
  contentPlaceholder?: string;

  // API
  ready: boolean;

  // form
  fields: TField[];

  // image
  allowProfileImage?: boolean
  onImageSelected?: (imageId: number, imageType?: string) => Promise<any>;
  coverImageUrl?: string;
  profileImageUrl?: string;

  // permissions
  canRefresh?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
}