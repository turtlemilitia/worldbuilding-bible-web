import { TOptionList } from '@/types/Generic'

export type TImage = {
  id: number;
  name: string;
  alt: string;
  thumbnail: string;
  original: string;
  pivot?: TImageableImagePivot
}

export type TCanHaveImages = {
  images?: TImage[];
}

export type TImageableImagePivot = {
  id: number;
  type: TImageType,
  image?: TImage;
}

export type TImageType = TOptionList