import {TField} from "../../hooks/fieldTools";
import {TGenericPost} from "../../types";
import { TFormHandling } from '../../hooks/useFormHandling/types'
import { TSelectOption } from '../Forms/Fields/FieldMapper'

export type TUseFields = {
  fields: TField[];
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
  permissionHandler?: TPermissionHandler;
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
  options: TPinForOption[]
  values: TPinForOption[]
}
export type TFavouriteHandler = {
  toggleFavourite: () => Promise<void>
  isFavourited: boolean
}
export type TPlayerCharacterHandler = {
  handleOnSelectUser: (values: TSelectOption[]) => Promise<any>
  values: TSelectOption[],
  options: TSelectOption[],
  canAssign: boolean
}

export type TPermissionForOption = TSelectOption & { type: 'user' | 'campaign', disabled?: boolean }
export type TPermissionHandler = {
  handleOnPermissionSelected: (values: TPermissionForOption[]) => Promise<any>
  options: TPermissionForOption[],
  values: TPermissionForOption[],
  canAssign: boolean
}

export type TPostProps<T> = {
  pageTypeName?: string;
  contentPlaceholder?: string;

  // form
  form: TForm<T>;
}
