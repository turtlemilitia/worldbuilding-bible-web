export type TImageDataDialogProps = {
  open: boolean;
  onClose: () => any
  name: string;
  alt: string;
  onChange: (name: 'name'|'alt', value: any) => any,
}