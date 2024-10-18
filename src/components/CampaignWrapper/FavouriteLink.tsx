import { Link } from 'react-router-dom'
import { FloatingBox } from '@/components/FloatingBox'
import SansSerifText from '@/components/SmallSansSerifText'
import React, { FunctionComponent } from 'react'
import { TFloatingBoxProps } from '@/components/FloatingBox/FloatingBox'

export type CampaignFavouriteLink = {
  link: string,
  name: string,
};
const FavouriteLink: FunctionComponent<CampaignFavouriteLink & TFloatingBoxProps> = ({link, name, ...props}) => {
  return (
    <div>
      <Link to={link}>
        <FloatingBox
          size={'sm'}
          className={`transition-all duration-1000 hover:bg-yellow-600`}
          {...props}
        >
          <SansSerifText className={'mx-2'}>{name}</SansSerifText>
        </FloatingBox>
      </Link>
    </div>
  )
}

export default FavouriteLink