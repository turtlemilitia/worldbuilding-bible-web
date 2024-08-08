import React, { FunctionComponent } from 'react'
import { Popover } from '@headlessui/react'
import { SelectImageButton } from '../SelectImageButton'
import { ImagePicker } from '../ImagePicker'

export type TProps = {
  onProfileImageSelected: (imageId: number) => Promise<number>
}
const ProfileImagePicker: FunctionComponent<TProps> = ({
  onProfileImageSelected
}) => {

  return (
    <Popover className="z-40 absolute -bottom-3 right-0">

      <Popover.Button className="outline-none">
        <SelectImageButton/>
      </Popover.Button>

      <Popover.Panel className="fixed top-1/2 mb-4 right-20 z-10">
        <ImagePicker multiple={false} onSelected={(ids) => onProfileImageSelected(ids[0])}/>
      </Popover.Panel>

    </Popover>
  )
}
export default ProfileImagePicker;