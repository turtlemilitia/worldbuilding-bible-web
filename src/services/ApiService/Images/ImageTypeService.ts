import { TImageType } from '../../../types'
import { createApiService } from '../createApiService'

type TImageTypeIndexResponse = TImageType[];

const ImageTypeService = createApiService<{}, TImageTypeIndexResponse, TImageType>('image-types');

export default ImageTypeService