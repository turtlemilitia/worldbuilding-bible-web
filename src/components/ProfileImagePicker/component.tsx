import React, { FunctionComponent } from 'react'
import { Popover } from '@headlessui/react'
import { SelectImageButton } from '../SelectImageButton'
import { ImagePicker } from '../ImagePicker'
import { TProfileImagePickerProps } from './types'

const ProfileImagePicker: FunctionComponent<TProfileImagePickerProps> = ({
  onProfileImageSelected
}) => {

  return (
    <Popover className="z-40 absolute -bottom-3 right-0">

      <Popover.Button className="outline-none">
        <SelectImageButton/>
      </Popover.Button>

      <Popover.Panel className="absolute bottom-full mb-4 right-0 z-10">
        <ImagePicker multiple={false} onSelected={(ids) => onProfileImageSelected(ids[0])}/>
      </Popover.Panel>

    </Popover>
  )
}
export default ProfileImagePicker;