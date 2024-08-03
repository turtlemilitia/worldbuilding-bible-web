import React, { FunctionComponent } from 'react'
import { Popover } from '@headlessui/react'
import { SelectImageButton } from '../SelectImageButton'
import { ImagePicker } from '../ImagePicker'
import { TCoverImagePickerProps } from './types'

const CoverImagePicker: FunctionComponent<TCoverImagePickerProps> = ({
  onCoverImageSelected
}) => {

  return (
    <Popover className="z-40 absolute -bottom-7 right-10">

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