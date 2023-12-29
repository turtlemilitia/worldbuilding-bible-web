import { TImage } from '../types'

export type TImageThumbnailProps = {
  image: TImage,
  selected: boolean;
  onSelected: (id: TImage['id']) => any;
  onSave: (data: TImage) => any;
  onDelete: (uniqueId: TImage['uniqueId'], id: TImage['id']) => any;
}