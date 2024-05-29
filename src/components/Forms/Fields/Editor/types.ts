export type TEditorProps = {
  id: string;
  initialValue?: string;
  onChange: (value: string) => any;
  placeholder?: string;
  canEdit?: boolean;
  className?: string;
}
