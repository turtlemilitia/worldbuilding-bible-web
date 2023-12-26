import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { FloatingBox } from '../FloatingBox'

import bgImage from '../../assets/images/darkAlley1.png'
import { Button } from '../Forms/Fields/Button'
import { FileInput } from '../Forms/Fields/FileInput'
import { readURL } from '../../utils/fileManager'
import { TImage } from './types'
import { PlusIcon, XIcon } from 'lucide-react'

// TODO finish image upload (need to work on back end and integrate with API)
const CoverImagePicker: FunctionComponent = () => {

  const [showFileInput, setShowFileInput] = useState(false)
  const [selected, setSelected] = useState<number[]>([])
  const [files, setFiles] = useState<FileList>()
  const [images, setImages] = useState<TImage[]>([])
  const [imagesFromFiles, setImagesFromFiles] = useState<TImage[]>([])

  useEffect(() => {
    setImages([
      { id: 1, src: bgImage, alt: 'La la la' },
      { id: 2, src: bgImage, alt: 'La la la' },
      { id: 3, src: bgImage, alt: 'La la la' },
      { id: 4, src: bgImage, alt: 'La la la' },
      { id: 5, src: bgImage, alt: 'La la la' },
      { id: 6, src: bgImage, alt: 'La la la' },
    ])
  }, [])

  const addImagesFromFiles = async () => {
    if (!files) {
      return;
    }
    const newImages: TImage[] = [];
    for(let i = 0; i < files.length; i++) {
      const url = await readURL(files[i]) as string;
      newImages.push({
        src: url
      })
    }
    setImagesFromFiles(newImages);
  }

  useEffect(() => {
    if (files?.length && FileReader) {
      addImagesFromFiles()
    }
  }, [files])

  const handleSelect = (selectedId: number|undefined) => {
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
    setFiles(files);
    setShowFileInput(false)
  }

  return (
    <FloatingBox>
      {files && <div>{files.length} files selected.</div>}
      {!showFileInput && (
        <div className="h-128 w-128 overflow-scroll">
          <div className="grid grid-cols-4 gap-4">
            {[...images, ...imagesFromFiles].map(({ id, src, alt }, index) => {
              return (
                <div className="w-full h-full max-h-28">
                  <img
                    key={index}
                    className={`rounded-md ${id && selected.includes(id) ? 'border-2 border-yellow-500' : ''} ${id ? 'cursor-pointer' : ''} max-w-full max-h-full m-auto relative top-1/2 -translate-y-1/2`}
                    src={src}
                    alt={alt}
                    onClick={() => handleSelect(id)}
                  />
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
          <Button>Upload</Button>/* upload to list POST /images */
        )}
        {!showFileInput && (
          <Button>Select</Button>/* add to entity POST/PUT /imageables */
        )}
      </div>
    </FloatingBox>
  )
}

export default CoverImagePicker