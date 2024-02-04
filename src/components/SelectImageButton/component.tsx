import { FunctionComponent } from 'react'
import { ImageIcon } from 'lucide-react'
import { TSelectImageButtonProps } from './types'

const SelectImageButton: FunctionComponent<TSelectImageButtonProps> = ({size = 'md'}) => {
  return (
    <div className={`rounded-full shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 bg-stone-400 bg-opacity-10 text-stone-200 ${size === 'md' ? 'px-5 py-5' : 'px-2 py-2'} backdrop-blur-sm cursor-pointer`}>
      <ImageIcon/>
    </div>
  )
}

export default SelectImageButton;