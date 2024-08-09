import {TField} from "../../hooks/fieldTools";
import {TGenericPost} from "../../types";
import { TFormHandling } from '../../hooks/useFormHandling/types'

export type TUseFields = {
  fields: TField[];
  ready: boolean
}

type TPost<T> = T & TGenericPost;

export type TUseFormProps<T> = {
  onFetched?: (data: T) => any
  onCreated?: (data: T) => any
  onUpdated?: (data: T) => any
  onDeleted?: () => any
}
export type TForm<T> =  TFormHandling<T> & {
  isNew: boolean
  fields: TField[]
  // permissions
  // canRefresh?: boolean;
  canEdit: boolean;
  // canDelete?: boolean;
  imageHandler: TUseImageHandler;
}

export type TUseImageHandler = {
  handleOnImageSelected: (id: number, imageType: string) => Promise<any>
  canHaveProfileImage?: boolean
  getImage: (type: ('cover'|'profile')) => string|undefined
}

export type TPostProps<T> = {
  pageTypeName?: string;
  contentPlaceholder?: string;

  // form
  form: TForm<T>;
}
