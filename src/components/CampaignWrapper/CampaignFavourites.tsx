import React, { FunctionComponent } from 'react'
import { SmallFloatingBox } from '../FloatingBox'
import SmallSansSerifText from '../SmallSansSerifText'
import { useCampaignDataManager } from '../../hooks/DataManagers'
import { Transition } from '@headlessui/react'
import useUrlFormatter from '../../hooks/useUrlFormatter'
import { Link } from 'react-router-dom'

const CampaignFavourites: FunctionComponent = () => {

  const { campaign } = useCampaignDataManager()
  const { compendiumPath } = useUrlFormatter()

  return (
    <Transition
      show={Boolean(campaign?.currentLocation || campaign?.currentQuest)}
      enter={'transition-all duration-1000'}
      enterFrom={'-top-10 opacity-0'}
      enterTo={'top-0 opacity-100'}
      leave={'transition-all duration-1000'}
      leaveFrom={'top-0 opacity-100'}
      leaveTo={'-top-10 opacity-0'}
    >
      <div className="flex-1 items-end space-y-4 mb-4 text-right">
        {campaign?.currentLocation && (
          <div>
            <Link to={`${compendiumPath}/locations/${campaign.currentLocation.slug}`}>
              <SmallFloatingBox>
                <SmallSansSerifText>{campaign.currentLocation.name}</SmallSansSerifText>
              </SmallFloatingBox>
            </Link>
          </div>
        )}
        {campaign?.currentQuest && (
          <div>
            <Link to={`/campaigns/${campaign.slug}/quests/${campaign.currentQuest.slug}`}>
              <SmallFloatingBox>
                <SmallSansSerifText>{campaign.currentQuest.name}</SmallSansSerifText>
              </SmallFloatingBox>
            </Link>
          </div>
        )}
      </div>
    </Transition>
  )
}

export default CampaignFavourites