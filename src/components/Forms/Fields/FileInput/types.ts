export type TFileInputProps = {
  onChange: (file: FileList) => any,
  name: string;
  multiple?: boolean;
  fileSpecificationsText?: string;
  accept?: string;
}