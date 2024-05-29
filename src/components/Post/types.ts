import {TField} from "../../hooks/useFields";
import {TGenericPost} from "../../types";

export type TUseFields = {
  fields: TField[];
  ready: boolean
}

type TPost<T> = T & TGenericPost;

export type TUseFormProps<T> = {
  isNew: boolean;

  onFetched?: (data: T) => any
  onCreated?: (data: T) => any
  onUpdated?: (data: T) => any
  onDeleted?: () => any

  // persisted data
  persistedData?: T,
  setPersistedData: (data?: T) => any,
  updatePersistedData: (data: Partial<T>) => any,
  resetPersistedData?: () => any
}
export type TUseForm<T> = {
  loading: boolean;
  saving: boolean;

  newData?: Partial<TPost<T>>;

  errors: { [key: string]: string };

  onFieldChange: (name: string, value: string) => any;
  onFetch: () => void;
  onSave: () => any;
  onDelete: () => void;

  onCreated?: (data: T) => any
  onUpdated?: (data: T) => any
  onDeleted?: () => any
}

export type TUseImageHandler = {
  handleOnImageSelected: (id: number, imageType: string) => Promise<any>
  getImage: (type: ('cover'|'profile')) => string|undefined
}

export type TPostProps<T> = {
  isNew: boolean

  pageTypeName?: string;
  contentPlaceholder?: string;

  // form
  form: TUseForm<T>;
  fields?: TUseFields;
  imageHandler?: TUseImageHandler;

  // permissions
  // canRefresh?: boolean;
  canEdit?: boolean;
  // canDelete?: boolean;
}
