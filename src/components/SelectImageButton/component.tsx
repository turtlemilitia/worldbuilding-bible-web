import { FunctionComponent } from 'react'
import { ImageIcon } from 'lucide-react'
import { TImagePickerProps } from './types'

const SelectImageButton: FunctionComponent<TImagePickerProps> = () => {
  return (
    <button className={`rounded-full shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 text-stone-200 px-5 py-5 backdrop-blur-sm cursor-pointer`}>
      <ImageIcon/>
    </button>
  )
}

export default SelectImageButton;