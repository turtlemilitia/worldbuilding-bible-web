
export type useFormHandlingProps<T> = {
  isNew: boolean,
  pathToNew: (data: T) => string

  // API
  onFetch: () => Promise<T>,
  onCreate: (data: any) => Promise<T>;
  onUpdate: (data: any) => Promise<T>;
  requestStructureCallback?: (data: any) => any,
  onCreated?: (data: T) => any
  onUpdated?: (data: T) => any

  // persisted data
  persistedData: T,
  setPersistedData: (data: T) => any,
  updatePersistedData: (data: T) => any,
  resetPersistedData: () => any
}

export type useFormHandlingType<T> = (data: useFormHandlingProps<T>) => {
  loading: boolean;

  newData: T;

  handleOnFieldChange: (name: string, value: string) => any;
  handleOnFetch: () => void;
  handleOnSave: () => void;

  errors: { [key: string]: string };
};