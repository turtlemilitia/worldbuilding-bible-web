import { TFields } from '../InfoBar'

export type TPostProps<T> = {
  initialValues: T,
  pageTypeName?: string;
  onSubmit: (data: T) => Promise<T>;
  onFetch: () => Promise<any>;
  fields: TFields[];
  contentPlaceholder?: string;
  ready: boolean;
  resetData: () => any
  onImageSelected?: (imageId: number, imageType?: string) => Promise<any>;
  coverImageUrl?: string;
}