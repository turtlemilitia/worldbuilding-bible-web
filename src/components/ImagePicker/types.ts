export type TImage = {
  uniqueId: string;
  id: number|undefined;
  name: string;
  alt: string;
  thumbnail: string;
  original: string;
  saving?: boolean;
  fileToUpload?: number;
}

export type TImagePickerProps = {
  multiple?: boolean,
  onSelected?: (imagesIds: number[]) => Promise<any>
  className?: string
}