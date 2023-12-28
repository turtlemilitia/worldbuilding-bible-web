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