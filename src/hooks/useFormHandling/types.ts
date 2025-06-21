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

  hasDifference: boolean;
};