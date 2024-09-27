import React, { FunctionComponent, useMemo } from 'react'
import { FloatingBox } from '../FloatingBox'
import SansSerifText from '../SmallSansSerifText'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import { Transition } from '@headlessui/react'
import useUrlFormatter from '../../hooks/useUrlFormatter'
import { Link } from 'react-router-dom'
import { mapPlural } from '../../utils/dataUtils'
import useAuthUserDataManager
  from '../../hooks/DataManagers/useAuthUserDataManager'

type CampaignFavouriteList = {
  link: string,
  name: string,
  type: 'pin' | 'character' | 'favourite'
};
const CampaignFavourites: FunctionComponent = () => {

  const { user } = useAuthUserDataManager()
  const { campaign } = useCampaignDataManager()
  const { compendiumPath } = useUrlFormatter()

  const links = useMemo(() => {
    const list: CampaignFavouriteList[] = []
    if (user?.characters) {
      list.push(...user.characters.map((item): CampaignFavouriteList => ({
        link: `${compendiumPath}/characters/${item.slug}`,
        name: item.name,
        type: 'character',
      })))
    }
    if (campaign?.pins) {
      list.push(...campaign.pins.map((item): CampaignFavouriteList => ({
        link: `${compendiumPath}/${mapPlural(
          item.pinnableType)}/${item.pinnable.slug}`,
        name: item.pinnable.name,
        type: 'pin',
      })))
    }
    if (user?.pins) {
      list.push(...user.pins.map((item): CampaignFavouriteList => ({
        link: `${compendiumPath}/${mapPlural(
          item.pinnableType)}/${item.pinnable.slug}`,
        name: item.pinnable.name,
        type: 'pin',
      })))
    }
    if (user?.favourites) {
      list.push(...user?.favourites.map((item): CampaignFavouriteList => ({
        link: `${compendiumPath}/${mapPlural(
          item.favouritableType)}/${item.favouritable.slug}`,
        name: item.favouritable.name,
        type: 'favourite',
      })))
    }
    return list
  }, [
    user?.characters,
    compendiumPath,
    campaign?.pins,
    user?.pins,
    user?.favourites])

  return (
    <Transition
      show={Boolean(links)}
      enter={'transition-all duration-1000'}
      enterFrom={'-top-10 opacity-0'}
      enterTo={'top-0 opacity-100'}
      leave={'transition-all duration-1000'}
      leaveFrom={'top-0 opacity-100'}
      leaveTo={'-top-10 opacity-0'}
    >
      <div className="flex-1 items-end space-y-4 mb-4 text-right">
        {links?.map(({ link, name, type }, index) => {
          return (
            <div key={index}>
              <Link to={link}>
                <FloatingBox
                  size={'sm'}
                  color={type === 'character' ? 'solid' : 'dark'}
                  border={type === 'character' ? 'yellow' : 'dark'}
                  className={`transition-all duration-1000 hover:bg-yellow-600`}
                >
                  <SansSerifText className={'mx-2'}>{name}</SansSerifText>
                </FloatingBox>
              </Link>
            </div>
          )
        })}
      </div>
    </Transition>
  )
}

export default CampaignFavourites