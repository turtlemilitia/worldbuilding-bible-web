import {useFormHandlingProps} from '../../hooks/useFormHandling'
import {TField} from "../../hooks/useFields";
import {TGenericPost} from "../../types";

export type TUseFields = {
  fields: TField[];
  ready: boolean
}

type TPost<T> = T & TGenericPost;

export type TUseForm<T> = {
  loading: boolean;
  saving: boolean;

  persistedData?: TPost<T>;
  newData?: Partial<TPost<T>>;
  fetchedData?: TPost<T>;

  errors: { [key: string]: string };
  updatePersistedData: (payload: Partial<TPost<T>>) => any;
  updateAllData: (payload: TPost<T>) => any;

  handleOnFieldChange: (name: string, value: string) => any;
  handleOnFetch: () => void;
  handleOnSave: () => void;
  handleOnDelete: () => void;
}

export type TUseImageHandler = {
  handleOnImageSelected: (id: number, imageType: string) => Promise<any>
  getImage: (type: ('cover'|'profile')) => string|undefined
}

export type TPostProps<T> = useFormHandlingProps<T> & {
  pageTypeName?: string;
  contentPlaceholder?: string;

  // form
  form: TUseForm<T>;
  fields: TUseFields;
  imageHandler?: TUseImageHandler;

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
