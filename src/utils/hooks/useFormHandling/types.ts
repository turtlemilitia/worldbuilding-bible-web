
export type useFormHandlingProps<T> = {
  isNew: boolean,
  pathToNew: (data: T) => string
  pathAfterDelete: string

  // API
  onFetch: () => Promise<T>,
  onCreate: (data: any) => Promise<T>;
  onUpdate: (data: any) => Promise<T>;
  onDelete: () => Promise<any>
  requestStructureCallback?: (data: any) => any,
  onFetched?: (data: T) => any
  onCreated?: (data: T) => any
  onUpdated?: (data: T) => any
  onDeleted?: () => any

  // persisted data
  persistedData: T,
  setPersistedData: (data: T) => any,
  updatePersistedData: (data: T) => any,
  resetPersistedData: () => any
}

export type useFormHandlingType<T> = (data: useFormHandlingProps<T>) => {
  loading: boolean;
  saving: boolean;

  newData: T;
  fetchedData: T;

  handleOnFieldChange: (name: string, value: string) => any;
  handleOnFetch: () => void;
  handleOnSave: () => void;
  handleOnDelete: () => void;

  errors: { [key: string]: string };
};