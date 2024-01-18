import { TFields } from '../InfoBar'

export type TPostProps<T> = {
  isNew: boolean;
  remoteData: T;
  pageTypeName?: string;
  onSave: (data: T) => Promise<T>;
  onFetch: () => Promise<T>;
  fields: TFields[];
  contentPlaceholder?: string;
  ready: boolean;
  setRemoteData: (data: T) => any;
  resetData: () => any
  onImageSelected?: (imageId: number, imageType?: string) => Promise<any>;
  coverImageUrl?: string;
  requestStructureCallback?: (data: any) => any;
}