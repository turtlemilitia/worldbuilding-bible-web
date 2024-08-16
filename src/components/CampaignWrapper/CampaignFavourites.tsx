import React, { FunctionComponent } from 'react'
import { SmallFloatingBox } from '../FloatingBox'
import SmallSansSerifText from '../SmallSansSerifText'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import { Transition } from '@headlessui/react'
import useUrlFormatter from '../../hooks/useUrlFormatter'
import { Link } from 'react-router-dom'
import { mapPlural } from '../../utils/dataUtils'
import useAuthUserDataManager from '../../hooks/DataManagers/useAuthUserDataManager'

const CampaignFavourites: FunctionComponent = () => {

  const { user } = useAuthUserDataManager()
  const { campaign } = useCampaignDataManager()
  const { compendiumPath } = useUrlFormatter()

  return (
    <Transition
      show={Boolean(campaign?.pins || user?.pins || user?.favourites || user?.characters)}
      enter={'transition-all duration-1000'}
      enterFrom={'-top-10 opacity-0'}
      enterTo={'top-0 opacity-100'}
      leave={'transition-all duration-1000'}
      leaveFrom={'top-0 opacity-100'}
      leaveTo={'-top-10 opacity-0'}
    >
      <div className="flex-1 items-end space-y-4 mb-4 text-right">
        {user?.characters?.map((item, index) => {
          return (
            <div key={index}>
              <Link to={`${compendiumPath}/characters/${item.slug}`}>
                <SmallFloatingBox className={'bg-stone-900 bg-opacity-100 transition-all duration-1000 hover:bg-yellow-600 px-4'}>
                  <SmallSansSerifText>{item.name}</SmallSansSerifText>
                </SmallFloatingBox>
              </Link>
            </div>
          )
        })}
        {campaign?.pins?.map((item, index) => {
          return (
            <div key={index}>
              <Link to={`${compendiumPath}/${mapPlural(item.pinnableType)}/${item.pinnable.slug}`}>
                <SmallFloatingBox className={'px-4'}>
                  <SmallSansSerifText>{item.pinnable.name}</SmallSansSerifText>
                </SmallFloatingBox>
              </Link>
            </div>
          )
        })}
        {user?.pins?.map((item, index) => {
          return (
            <div key={index}>
              <Link to={`${compendiumPath}/${mapPlural(item.pinnableType)}/${item.pinnable.slug}`}>
                <SmallFloatingBox className={'px-4'}>
                  <SmallSansSerifText>{item.pinnable.name}</SmallSansSerifText>
                </SmallFloatingBox>
              </Link>
            </div>
          )
        })}
        {user?.favourites?.map((item, index) => {
          return (
            <div key={index}>
              <Link to={`${compendiumPath}/${mapPlural(item.favouritableType)}/${item.favouritable.slug}`}>
                <SmallFloatingBox className={'px-4'}>
                  <SmallSansSerifText>{item.favouritable.name}</SmallSansSerifText>
                </SmallFloatingBox>
              </Link>
            </div>
          )
        })}
      </div>
    </Transition>
  )
}

export default CampaignFavourites