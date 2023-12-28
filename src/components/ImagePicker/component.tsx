import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { FloatingBox } from '../FloatingBox'
import { Button } from '../Forms/Fields/Button'
import { FileInput } from '../Forms/Fields/FileInput'
import { readURL } from '../../utils/fileManager'
import { PlusIcon, XIcon } from 'lucide-react'
import { indexImages, storeImage } from '../../services/ImageService'
import { TImage } from './types'
import LoadingWrapper from '../LoadingWrapper'


const CoverImagePicker: FunctionComponent = () => {

  const [showFileInput, setShowFileInput] = useState(false)
  const [selected, setSelected] = useState<number[]>([])
  const [files, setFiles] = useState<FileList>()
  const [images, setImages] = useState<TImage[]>([])

  useEffect(() => {
    indexImages()
      .then(({ data }) => {
        setImages(data.data.map(image => ({
          uniqueId: Math.random().toString().slice(2),
          ...image
        })))
      })
  }, [])

  const addImagesFromFiles = async (files: FileList) => {
    setFiles(files);
    const newImages: TImage[] = []
    for (let i = 0; i < files.length; i++) {
      const url = await readURL(files[i]) as string
      newImages.push({
        uniqueId: Math.random().toString().slice(2),
        id: undefined,
        name: files[i].name,
        alt: '',
        thumbnail: url,
        original: url,
        fileToUpload: i
      })
    }
    setImages(prevState => [
      ...prevState,
      ...newImages
    ])
  }

  const handleSelect = (selectedId: number | undefined) => {
    if (selectedId) {
      setSelected(prevState => {
        if (prevState.includes(selectedId)) {
          return prevState.filter(prevStateId => prevStateId !== selectedId)
        } else {
          return [...prevState, selectedId]
        }
      })
    }
  }

  const handleFilesSelected = (files: FileList) => {
    addImagesFromFiles(files)
    setShowFileInput(false)
  }

  const handleUpload = () => {
    if (!files?.length) {
      return;
    }
    const imagesWithFiles = images.filter(image => image.fileToUpload !== undefined);
    imagesWithFiles.forEach((image: TImage) => {
      setImages(prevState => prevState.map(prevImageState => {
        if (prevImageState.fileToUpload === image.fileToUpload) {
          return {
            ...image,
            saving: true
          };
        }
        return prevImageState;
      }));

      // create a new FormData object and append the file to it
      const formData = new FormData();
      formData.append("image", files[image.fileToUpload as number]);

      console.log(formData);

      storeImage(formData)
        .then((response) => {
          setImages(prevState => prevState.map(prevImageState => {
            if (prevImageState.uniqueId === image.uniqueId) {
              return {
                uniqueId: image.uniqueId,
                ...response.data.data
              };
            }
            return prevImageState;
          }));
        })
        .catch(error => {
          // todo set error
          // currently some images are failing to upload- why?

          // todo handle selecting image and uploading to imageables

          // todo handle change name and alt text
          return;
        });
    });
  }

  return (
    <FloatingBox>
      {!showFileInput && (
        <div className="h-128 w-128 overflow-scroll">
          <div className="grid grid-cols-4 gap-4">
            {images.map(({ id, thumbnail, alt, saving }, index) => {
              return (
                <div className="w-full h-full max-h-28">
                  <div className={`rounded-md ${id && selected.includes(id) ? 'border-2 border-yellow-500' : ''} relative top-1/2 -translate-y-1/2 overflow-hidden`}>
                    <LoadingWrapper loading={!!saving}>
                      <img
                        key={index}
                        className={`${id ? 'cursor-pointer' : 'opacity-50'} max-w-full max-h-full m-auto`}
                        src={thumbnail}
                        alt={alt}
                        onClick={() => handleSelect(id)}
                      />
                    </LoadingWrapper>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {showFileInput && (
        <div className="w-128">
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
        {files && (
          <Button onClick={handleUpload}>Upload</Button>/* upload to list POST /images */
        )}
        {!showFileInput && (
          <Button>Select</Button>/* add to entity POST/PUT /imageables */
        )}
      </div>
    </FloatingBox>
  )
}

export default CoverImagePicker