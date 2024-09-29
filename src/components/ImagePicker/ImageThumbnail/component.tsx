import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import LoadingWrapper from '../../LoadingWrapper'
import { TImageThumbnailProps } from './types'
import { PencilIcon, SaveIcon, TrashIcon } from 'lucide-react'
import { ImageDataDialog } from '../ImageDataDialog'

const ImageThumbnail: FunctionComponent<TImageThumbnailProps> = ({
  image,
  selected,
  onSelected,
  onDelete,
  onSave,
}) => {
  const [showIcons, setShowIcons] = useState(true)
  const [showFields, setShowFields] = useState(false)
  const [data, setData] = useState(image)
  const { uniqueId, id, thumbnail, alt, saving } = image

  useEffect(() => {
    setData(image)
  }, [image.name, image.alt])

  const canBeSaved = useCallback(() => {
    return image.id === undefined || image.name !== data.name || image.alt !==
      data.alt
  }, [image.name, data.name, image.alt, data.alt, image.id])

  const handleFieldChange = (field: 'name' | 'alt', value: string) => {
    setData(prevState => ({ ...prevState, [field]: value }))
  }

  return (
    <>
      <div>
        <LoadingWrapper loading={!!saving} colour={'light'}
                        positioning={'absolute'}>
          <div className="relative w-full h-full max-h-28">
            <div
              className={`rounded-md ${id && selected ? 'border-2 border-yellow-500' : ''}`}>
              <img
                onMouseEnter={() => setShowIcons(true)}
                onMouseLeave={() => setShowIcons(false)}
                className={`${id ? 'cursor-pointer' : 'opacity-50'} max-h-28 w-full object-contain`}
                src={thumbnail}
                alt={alt}
                onClick={() => onSelected(id)}
              />
              {showIcons && (
                <div className="absolute bottom-0 w-full flex justify-end">
                  <button type="button" className="p-1 hover:text-burnOrange"
                          onClick={() => setShowFields(true)}>
                    <PencilIcon size={15}/>
                  </button>
                  {canBeSaved() && (
                    <button type="button" className="p-1 hover:text-burnOrange"
                            onClick={() => onSave(data)}>
                      <SaveIcon size={15}/>
                    </button>
                  )}
                  {id && (
                    <button type="button" className="p-1 hover:text-burnOrange"
                            onClick={() => onDelete(uniqueId, id)}>
                      <TrashIcon size={15}/>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </LoadingWrapper>
        <div className="text-xs text-center mt-1">{data.name}</div>
      </div>
      <ImageDataDialog
        open={showFields}
        onClose={() => setShowFields(false)}
        name={data.name}
        alt={data.alt}
        onChange={handleFieldChange}/>
    </>
  )
}

export default ImageThumbnail