import { FunctionComponent } from 'react'
import bgImage from '../../assets/images/ShadeImage.png'
import {SmallFloatingBox} from "../FloatingBox";
import {ImageIcon} from "lucide-react";
import {Button} from "@headlessui/react";

export type TProps = {
  image?: string;
  openPicker: () => any
}
const ProfileImage: FunctionComponent<TProps> = ({ openPicker, image }) => {
  return (
    <div className={`relative h-12 w-full flex justify-center items-center`}>
      <div
        className={`absolute -top-28 rounded-full shadow-md shadow-stone-950 border border-opacity-30 border-stone-400 h-40 w-40 bg-cover bg-center mx-auto backdrop-blur-sm`}
        style={{ backgroundImage: `url(${image || bgImage})` }}
      >
          <Button onClick={openPicker}>
              <SmallFloatingBox hover className={'z-40 absolute -bottom-3 right-0'}>
                  <ImageIcon className="stroke-stone-400 h-5 w-5"/>
              </SmallFloatingBox>
          </Button>
      </div>
    </div>)
}

export default ProfileImage