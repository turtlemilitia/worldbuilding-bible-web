import { FloatingBox } from '../../FloatingBox'
import { Dialog } from '@headlessui/react'
import { XIcon } from 'lucide-react'
import React, { FunctionComponent } from 'react'
import { TImageDataDialogProps } from './types'
import TextField from '../../Forms/Fields/TextField'

const ImageDataDialog: FunctionComponent<TImageDataDialogProps> = ({ open, onClose, name, alt, onChange }) => {

  return (
    <Dialog open={open} onClose={() => onClose()} className="relative z-40">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <FloatingBox>
            <Dialog.Panel>
              <Dialog.Title className="font-display text-xl text-center mb-4">{name}</Dialog.Title>
              <Dialog.Description>
                Update the name and alt description for the image
              </Dialog.Description>

              <form>
                <div className="my-2 flex justify-end gap-2">
                  <button type="button" onClick={onClose}><XIcon className={'h-6 w-6'}/></button>
                </div>
                <div className="my-2">
                  <TextField onChange={(value) => onChange('name', value)} value={name}/>
                </div>
                <div className="my-2">
                  <TextField onChange={(value) => onChange('alt', value)} value={alt}/>
                </div>
              </form>
            </Dialog.Panel>
          </FloatingBox>
        </div>
      </div>
    </Dialog>
  )
}

export default ImageDataDialog