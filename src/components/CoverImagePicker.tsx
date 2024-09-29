import React, { FunctionComponent } from 'react'
import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import { SelectImageButton } from './SelectImageButton'
import { ImagePicker } from './ImagePicker'

type TCoverImagePickerProps = {
  onCoverImageSelected: (imageId: number) => Promise<number>
}
const CoverImagePicker: FunctionComponent<TCoverImagePickerProps> = ({
  onCoverImageSelected,
}) => {

  return (
    <Popover>

      <PopoverButton className="outline-none">
        <SelectImageButton/>
      </PopoverButton>
      <PopoverBackdrop className="fixed inset-0 bg-black/15" />
      <PopoverPanel anchor={'bottom'} className="flex flex-col p-4 z-50">
          <ImagePicker multiple={false}
                       onSelected={(ids) => onCoverImageSelected(ids[0])}/>
      </PopoverPanel>

    </Popover>
  )
}
export default CoverImagePicker