import { TFields } from '../InfoBar'

export type TPostProps<T> = {
  initialValues: T,
  pageTypeName?: string;
  name: string;
  onSubmit: (data: T) => Promise<T>;
  onFetch: () => Promise<any>;
  fields: TFields[];
  contentPlaceholder?: string;
  ready: boolean;
  resetData: () => any
}