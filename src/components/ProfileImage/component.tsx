import ProfileImagePicker from '../ProfileImagePicker'
import { FunctionComponent } from 'react'
import { TProfileImageProps } from './types'
import bgImage from '../../assets/images/ShadeImage.png'

const ProfileImage: FunctionComponent<TProfileImageProps> = ({ onSelected, image }) => {
  return (
    <div
      className={`relative rounded-full shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 h-40 w-40 bg-cover m-auto backdrop-blur-sm`}
      style={{ backgroundImage: `url(${image || bgImage})` }}
    >
      <ProfileImagePicker onProfileImageSelected={onSelected}/>
    </div>)
}

export default ProfileImage