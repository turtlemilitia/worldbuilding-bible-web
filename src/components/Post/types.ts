import {TField} from "../../hooks/fieldTools";
import {TGenericPost} from "../../types";
import { TFormHandling } from '../../hooks/useFormHandling/types'
import { TSelectOption } from '../Forms/Fields/FieldMapper'

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
  imageHandler: TImageHandler;
  pinHandler: TPinHandler;
  favouriteHandler: TFavouriteHandler;
  playerCharacterHandler?: TPlayerCharacterHandler;
}

export type TPinForOption = TSelectOption & { type: 'user' | 'campaign', disabled?: boolean }
export type TImageHandler = {
  handleOnImageSelected: (id: number, imageType: string) => Promise<any>
  canHaveProfileImage?: boolean
  getImage: (type: ('cover'|'profile')) => string|undefined
}
export type TPinHandler = {
  canPin: boolean
  handleOnPinSelected: (values: (TSelectOption & {type: 'campaign' | 'user'})[]) => Promise<any>,
  values: TPinForOption[]
}
export type TFavouriteHandler = {
  toggleFavourite: () => Promise<void>
  isFavourited: boolean
}
export type TPlayerCharacterHandler = {
  handleOnSelectUser: (values: TSelectOption[]) => Promise<any>
  values: TSelectOption[],
  canAssign: boolean
}

export type TPostProps<T> = {
  pageTypeName?: string;
  contentPlaceholder?: string;

  // form
  form: TForm<T>;
}
