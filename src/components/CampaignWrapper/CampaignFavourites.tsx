import React, { FunctionComponent, useMemo } from 'react'
import SmallSansSerifText from '../SmallSansSerifText'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import { Transition } from '@headlessui/react'
import useUrlFormatter from '../../hooks/useUrlFormatter'
import { mapPlural } from '@/utils/dataUtils'
import useAuthUserDataManager
  from '../../hooks/DataManagers/useAuthUserDataManager'
import { makeLink } from '@/hooks/useLink'
import FavouriteLink, {
  CampaignFavouriteLink,
} from '@/components/CampaignWrapper/FavouriteLink'

type TCampaignFavouriteItem = (CampaignFavouriteLink & { type: string });
const CampaignFavourites: FunctionComponent = () => {

  const { user } = useAuthUserDataManager()
  const { campaign } = useCampaignDataManager()
  const { compendiumPath } = useUrlFormatter()

  const links = useMemo(() => {
    const list: TCampaignFavouriteItem[] = []
    if (campaign?.pins) {
      list.push(...campaign.pins.map((item): TCampaignFavouriteItem => ({
        link: `${compendiumPath}/${mapPlural(item.pinnableType)}/${item.pinnable.slug}`,
        name: item.pinnable.name,
        type: item.pinnableType
      })))
    }
    if (user?.pins) {
      list.push(...user.pins.map((item): TCampaignFavouriteItem => ({
        link: `${compendiumPath}/${mapPlural(item.pinnableType)}/${item.pinnable.slug}`,
        name: item.pinnable.name,
        type: item.pinnableType
      })))
    }
    if (user?.favourites) {
      list.push(...user?.favourites.map((item): TCampaignFavouriteItem => ({
        link: makeLink(mapPlural(item.favouritableType), item.favouritable.slug, compendiumPath, campaign?.slug),
        name: item.favouritable.name,
        type: item.favouritableType
      })))
    }

    return Object.entries(
      list.reduce((acc, item) => {
        const { type } = item;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(item);
        return acc;
      }, {} as Record<string, TCampaignFavouriteItem[]>)
    ).map(([type, items]) => ({ type, items }))
  }, [compendiumPath, user?.pins, user?.favourites, campaign?.pins, campaign?.slug])

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
        {!!user?.characters?.length && (
          <div className={'flex-1 space-y-2'}>
            {user.characters.map(({ slug, name }, index) => {
              return (
                <FavouriteLink
                  key={index}
                  link={`${compendiumPath}/characters/${slug}`}
                  name={name}
                  color={'solid'}
                  border={'yellow'}
                />
              )
            })}
          </div>
        )}
        {links && links.map(({ type, items }) => (
          <div className={'flex-1 space-y-2'}>
            <SmallSansSerifText size={'xxs'}>{mapPlural(type)}</SmallSansSerifText>
            {items.map(({ link, name }, index) => {
              return (
                <FavouriteLink
                  key={index}
                  link={link}
                  name={name}
                  color={'dark'}
                  border={'dark'}
                />
              )
            })}
          </div>
        ))}
      </div>
    </Transition>
  )
}

export default CampaignFavourites