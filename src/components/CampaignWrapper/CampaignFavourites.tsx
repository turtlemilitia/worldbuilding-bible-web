import { FunctionComponent } from 'react'
import { SmallFloatingBox } from '../FloatingBox'
import SmallSansSerifText from '../SmallSansSerifText'
import { useCampaignDataManager } from '../../hooks/DataManagers'

const CampaignFavourites: FunctionComponent = () => {

  const { campaign } = useCampaignDataManager()

  return (
    <div className="flex-1 items-end space-y-4 mb-4 text-right">
      <div>
        <SmallFloatingBox>
          <SmallSansSerifText>Cheilidhin</SmallSansSerifText>
        </SmallFloatingBox>
      </div>
      <div>
        <SmallFloatingBox>
          <SmallSansSerifText>Find the Mayor's Daughter</SmallSansSerifText>
        </SmallFloatingBox>
      </div>
    </div>
  )
}

export default CampaignFavourites