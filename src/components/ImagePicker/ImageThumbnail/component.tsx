import React, { FunctionComponent, ReactEventHandler, useCallback, useEffect, useState } from 'react'
import LoadingWrapper from '../../LoadingWrapper'
import { TImageThumbnailProps } from './types'
import { PencilIcon, SaveIcon, TrashIcon, XIcon } from 'lucide-react'
import { Dialog } from '@headlessui/react'
import { FloatingBox } from '../../FloatingBox'
import { ImageDataDialog } from '../ImageDataDialog'

const ImageThumbnail: FunctionComponent<TImageThumbnailProps> = ({
  image,
  selected,
  onSelected,
  onDelete,
  onSave
}) => {
  const [showIcons, setShowIcons] = useState(true)
  const [showFields, setShowFields] = useState(false)
  const [data, setData] = useState(image)
  const { uniqueId, id, thumbnail, alt, saving } = image

  useEffect(() => {
    setData(image)
  }, [image.name, image.alt])

  const canBeSaved = useCallback(() => {
    return image.id === undefined || image.name !== data.name || image.alt !== data.alt
  }, [image.name, data.name, image.alt, data.alt])

  const handleFieldChange = (field: 'name'|'alt', value: string) => {
    setData(prevState => ({...prevState, [field]: value}))
  }

  return (
    <>
      <div className="w-full h-full max-h-28">
        <div
          onMouseEnter={() => setShowIcons(true)}
          onMouseLeave={() => setShowIcons(false)}
          className={`rounded-md ${id && selected ? 'border-2 border-yellow-500' : ''} relative top-1/2 -translate-y-1/2 overflow-hidden`}>
          <LoadingWrapper loading={!!saving} colour={'stone-200'}>
            <img
              className={`${id ? 'cursor-pointer' : 'opacity-50'} max-w-full max-h-full m-auto`}
              src={thumbnail}
              alt={alt}
              onClick={() => onSelected(id)}
            />
          </LoadingWrapper>
          {showIcons && (
            <div className="absolute bottom-0 w-full flex justify-end">
              <button type="button" className="p-1 hover:text-burnOrange" onClick={() => setShowFields(true)}><PencilIcon size={15}/>
              </button>
              {canBeSaved() && (
                <button type="button" className="p-1 hover:text-burnOrange" onClick={() => onSave(data)}><SaveIcon size={15}/></button>
              )}
              <button type="button" className="p-1 hover:text-burnOrange" onClick={() => onDelete(uniqueId, id)}><TrashIcon size={15}/></button>
            </div>
          )}
        </div>
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