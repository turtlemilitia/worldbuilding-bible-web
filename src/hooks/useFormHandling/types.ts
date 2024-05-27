import { TPostProps } from '../../components/Post/types'
import { TGenericPost } from '../../types'

export type useFormHandlingProps<T> = {
  id: TGenericPost['slug']|'new'
  isNew: boolean,
  mapData?: (data: any) => any;

  // API
  onFetch: () => Promise<T>,
  onCreate: (data: any) => Promise<T>;
  onUpdate: (data: any) => Promise<T>;
  onDelete: () => Promise<any>
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

export type useFormHandlingType<T> = {
  loading: boolean;
  saving: boolean;

  newData?: Partial<T>;
  setNewData: (payload: T) => any;

  onFieldChange: (name: string, value: string) => any;
  onFetch: () => void;
  onSave: () => void;
  onDelete: () => void;

  errors: { [key: string]: string };
};