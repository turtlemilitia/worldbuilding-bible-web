import { FunctionComponent } from 'react'
import { ImageIcon } from 'lucide-react'
import { SmallFloatingBox } from '../FloatingBox'

const SelectImageButton: FunctionComponent = () => {
  return (
    <SmallFloatingBox>
      <ImageIcon className="stroke-stone-400 h-5 w-5"/>
    </SmallFloatingBox>
  )
}

export default SelectImageButton;