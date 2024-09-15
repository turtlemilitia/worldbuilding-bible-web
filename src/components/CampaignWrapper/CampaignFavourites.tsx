import React, { FunctionComponent, useEffect, useMemo, useRef } from 'react'
import { SmallFloatingBox } from '../FloatingBox'
import SmallSansSerifText from '../SmallSansSerifText'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import { Transition } from '@headlessui/react'
import useUrlFormatter from '../../hooks/useUrlFormatter'
import { Link } from 'react-router-dom'
import { mapPlural } from '../../utils/dataUtils'
import useAuthUserDataManager from '../../hooks/DataManagers/useAuthUserDataManager'
import usePostDataManager from '../../hooks/DataManagers/usePostDataManager'

const CampaignFavourites: FunctionComponent = () => {

  const { user } = useAuthUserDataManager()
  const { campaign } = useCampaignDataManager()
  const { compendiumPath } = useUrlFormatter()

  const links = useMemo(() => {
    const list: {link: string, name: string}[] = [];
    if (user?.characters) {
      list.push(...user.characters.map((item, index) => ({
        link: `${compendiumPath}/characters/${item.slug}`,
        name: item.name
      })))
    }
    if (campaign?.pins) {
      list.push(...campaign.pins.map((item, index) => ({
        link: `${compendiumPath}/${mapPlural(item.pinnableType)}/${item.pinnable.slug}`,
        name: item.pinnable.name
      })))
    }
    if (user?.pins) {
      list.push(...user.pins.map((item, index) => ({
        link: `${compendiumPath}/${mapPlural(item.pinnableType)}/${item.pinnable.slug}`,
        name: item.pinnable.name
      })))
    }
    if (user?.favourites) {
      list.push(...user?.favourites.map((item, index) => ({
        link: `${compendiumPath}/${mapPlural(item.favouritableType)}/${item.favouritable.slug}`,
        name: item.favouritable.name
      })))
    }
    return list;
  }, [user?.characters, compendiumPath, campaign?.pins, user?.pins, user?.favourites]);

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
        {links?.map(({ link, name }, index) => {
          return (
            <div key={index}>
              <Link to={link}>
                <SmallFloatingBox className={'bg-stone-900 bg-opacity-100 transition-all duration-1000 hover:bg-yellow-600 px-4'}>
                  <SmallSansSerifText>{name}</SmallSansSerifText>
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