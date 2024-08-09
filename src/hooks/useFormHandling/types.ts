export type TUseFormHandlingProps<T, R> = {
  id: string|number|'new'
  isNew: boolean,
  mapData: (data: T) => R;

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
}

export type TFormHandling<T> = {
  loading: boolean;
  saving: boolean;

  data?: T;
  setData: (payload: T) => any;

  onFieldChange: (name: string, value: string) => any;
  onFetch: () => void;
  onSave: () => void;
  onDelete: () => void;

  errors: { [key: string]: string };
};