import React, { FunctionComponent, useState } from 'react'
import {
  Button,
  Dialog,
  DialogPanel,
} from '@headlessui/react'
import { SelectImageButton } from './SelectImageButton'
import { ImagePicker } from './ImagePicker'

type TCoverImagePickerProps = {
  onCoverImageSelected: (imageId: number) => Promise<number>
}
const CoverImagePicker: FunctionComponent<TCoverImagePickerProps> = ({
  onCoverImageSelected,
}) => {

  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>

      <Button className="outline-none" onClick={() => setDialogOpen(true)}>
        <SelectImageButton/>
      </Button>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}
              className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center w-full p-10">
          <DialogPanel className={'h-full'}>
            <ImagePicker
              multiple={false}
              onSelected={(ids) => onCoverImageSelected(ids[0])}
              className="relative w-full h-full max-h-full"
            />
          </DialogPanel>
        </div>
      </Dialog>

    </>
  )
}
export default CoverImagePicker