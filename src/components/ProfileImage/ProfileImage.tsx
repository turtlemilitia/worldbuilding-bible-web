import ProfileImagePicker from '../ProfileImagePicker'
import { FunctionComponent } from 'react'
import bgImage from '../../assets/images/ShadeImage.png'

export type TProps = {
  image?: string;
  onSelected: (imageId: number) => Promise<number>
}
const ProfileImage: FunctionComponent<TProps> = ({ onSelected, image }) => {
  return (
    <div className={`relative h-12 w-full flex justify-center items-center`}>
      <div
        className={`absolute -top-28 rounded-full shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 h-40 w-40 bg-cover mx-auto backdrop-blur-sm`}
        style={{ backgroundImage: `url(${image || bgImage})` }}
      >
        <ProfileImagePicker onProfileImageSelected={onSelected}/>
      </div>
    </div>)
}

export default ProfileImage