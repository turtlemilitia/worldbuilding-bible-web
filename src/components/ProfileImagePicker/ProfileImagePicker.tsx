import React, {FunctionComponent} from 'react'
import {Dialog, DialogPanel} from '@headlessui/react'
import {ImagePicker} from '../ImagePicker'

export type TProps = {
    open: boolean
    onClose: () => any
    onProfileImageSelected: (imageId: number) => Promise<number>
}
const ProfileImagePicker: FunctionComponent<TProps> = ({open, onClose, onProfileImageSelected}) => {

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <div className={'w-full lg:w-2/3 min-h-64 max-h-full max-w-6xl'}>
                    <DialogPanel>
                        <ImagePicker multiple={false} onSelected={(ids) => onProfileImageSelected(ids[0])}/>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
)
}
export default ProfileImagePicker;