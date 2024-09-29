import React, { FunctionComponent } from 'react'
import { Popover } from '@headlessui/react'
import { SelectImageButton } from './SelectImageButton'
import { ImagePicker } from './ImagePicker'

type TCoverImagePickerProps = {
  onCoverImageSelected: (imageId: number) => Promise<number>
}
const CoverImagePicker: FunctionComponent<TCoverImagePickerProps> = ({
  onCoverImageSelected
}) => {

  return (
    <Popover>

      <Popover.Button className="outline-none">
        <SelectImageButton/>
      </Popover.Button>

      <Popover.Panel className="absolute bottom-full mb-4 right-0 z-10">
        <ImagePicker multiple={false} onSelected={(ids) => onCoverImageSelected(ids[0])}/>
      </Popover.Panel>

    </Popover>
  )
}
export default CoverImagePicker;