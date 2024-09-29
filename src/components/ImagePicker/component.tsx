import React, { FunctionComponent, useEffect, useState } from 'react'
import { FloatingBox } from '../FloatingBox'
import { Button } from '../Forms/Fields/Button'
import { FileInput } from '../Forms/Fields/FileInput'
import { readURL } from '../../utils/fileManager'
import { PlusIcon, XIcon } from 'lucide-react'
import ImageService from '../../services/ApiService/Images/ImageService'
import { TImage, TImagePickerProps } from './types'
import LoadingWrapper from '../LoadingWrapper'
import useErrorHandling from '../../hooks/useErrorHandling'
import { ErrorBanner } from '../Banners/ErrorBanner'
import { ImageThumbnail } from './ImageThumbnail'

const ImagePicker: FunctionComponent<TImagePickerProps> = ({ multiple = true, onSelected }) => {

  const [loading, setLoading] = useState(false)
  const [showFileInput, setShowFileInput] = useState(false)
  const [selected, setSelected] = useState<number[]>([])
  const [files, setFiles] = useState<FileList>()
  const [images, setImages] = useState<TImage[]>([])
  const { errors, handleResponseErrors, resetErrors } = useErrorHandling()

  const setImageData = (uniqueId: TImage['uniqueId'], data: Partial<TImage>) => {
    setImages(prevState => prevState.map(prevImageState => {
      if (prevImageState.uniqueId === uniqueId) {
        return {
          ...prevImageState,
          ...data,
        }
      }
      return prevImageState
    }))
  }

  const removeImage = (uniqueId: TImage['uniqueId']) => {
    setImages(prevState => prevState.filter(image => image.uniqueId !== uniqueId))
  }

  useEffect(() => {
    setLoading(true)
    ImageService.index()
      .then(({ data }) => {
        setImages(data.data.map(image => ({
          uniqueId: Math.random().toString().slice(2),
          ...image
        })))
        setLoading(false)
      })
  }, [])

  const addImagesFromFiles = async (files: FileList) => {
    setFiles(files)
    const newImages: TImage[] = []
    for (let i = 0; i < files.length; i++) {
      const url = await readURL(files[i]) as string
      newImages.push({
        uniqueId: Math.random().toString().slice(2),
        id: undefined,
        name: files[i].name.replace(/\.[^/.]+$/, ''),
        alt: '',
        thumbnail: url,
        original: url,
        fileToUpload: i
      })
    }
    setImages(prevState => [
      ...prevState.filter(image => image.fileToUpload === undefined),
      ...newImages
    ])
  }

  const handleSelect = (selectedId: number | undefined) => {
    if (selectedId) {
      setSelected(prevState => {
        if (!multiple) {
          return [selectedId];
        }
        if (prevState.includes(selectedId)) {
          return prevState.filter(prevStateId => prevStateId !== selectedId)
        } else {
          return [...prevState, selectedId]
        }
      })
    }
  }

  const handleFilesSelected = (files: FileList) => {
    resetErrors()
    addImagesFromFiles(files)
    setShowFileInput(false)
  }

  const handleSaveImage = (data: TImage) => {
    resetErrors();
    setImageData(data.uniqueId, { saving: true })

    if (data.id) {
      ImageService.update(data.id, { name: data.name, alt: data.alt })
        .then((response) => {
          setImageData(data.uniqueId, { ...response.data.data, saving: false })
        })
        .catch((err) => {
          setImageData(data.uniqueId, { saving: false })
          handleResponseErrors(err)
        })
    } else {
      // create a new FormData object and append the file to it
      const formData = new FormData()
      if (files && (data.fileToUpload !== undefined) && files[data.fileToUpload as number]) {
        formData.append('image', files[data.fileToUpload as number])
      }
      formData.append('name', data.name);
      formData.append('alt', data.name);

      ImageService.store(formData)
        .then((response) => {
          setImageData(data.uniqueId, { ...response.data.data, saving: false })
        })
        .catch((err) => {
          setImageData(data.uniqueId, { saving: false })
          handleResponseErrors(err)

          // todo handle selecting image and uploading to imageables
        })
    }
  }

  const handleDelete = (uniqueId: TImage['uniqueId'], id: TImage['id']) => {
    if (!id) {
      return
    }
    resetErrors()
    setImageData(uniqueId, { saving: true })
    ImageService.destroy(id)
      .then(() => {
        removeImage(uniqueId)
      })
      .catch(err => {
        setImageData(uniqueId, { saving: false })
        handleResponseErrors(err)
      })
  }

  const handleSelected = () => {
    if (!onSelected) {
      return
    }
    setLoading(true);
    onSelected(selected)
      .then(() => {
        setLoading(false)
      })
  }

  return (
    <FloatingBox>
      <LoadingWrapper loading={loading} key="loading-image-picker" colour={'transparent'} positioning={'absolute'}>
        {!showFileInput && (
          <div className="min-w-128 h-128 w-full overflow-scroll">
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => {
                return (
                  <ImageThumbnail
                    key={index}
                    image={image}
                    selected={!!image.id && selected.includes(image.id)}
                    onSelected={handleSelect}
                    onSave={handleSaveImage}
                    onDelete={handleDelete}
                  />
                )
              })}
            </div>
          </div>
        )}
        {showFileInput && (
          <div className="min-w-128 w-full">
            <FileInput
              onChange={handleFilesSelected} name={'coverImage'}
              fileSpecificationsText="SVG, PNG, JPG or GIF (MAX. 800x400px)"
              accept="image/*"
              multiple={true}
            />
          </div>
        )}
        <div className="flex justify-end mt-4 gap-4">
          <button onClick={() => setShowFileInput(prevState => !prevState)}>
            {showFileInput ? <XIcon/> : <PlusIcon/>}
          </button>
          {!showFileInput && selected.length > 0 && (
            <Button onClick={handleSelected}>Select</Button>
          )}
        </div>
        {Object.keys(errors).length > 0 && (
          <div className="mt-4">
            <ErrorBanner errors={errors}/>
          </div>
        )}
      </LoadingWrapper>
    </FloatingBox>
  )
}

export default ImagePicker