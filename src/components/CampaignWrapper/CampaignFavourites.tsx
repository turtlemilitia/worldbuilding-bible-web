import { FunctionComponent } from 'react'
import { RoundedTextBox } from '../RoundedTextBox'
import SmallSansSerifText from '../SmallSansSerifText'
import { useCampaignDataManager } from '../../hooks/DataManagers'

const CampaignFavourites: FunctionComponent = () => {

  const { campaign } = useCampaignDataManager()

  return (
    <div className="flex-1 items-end space-y-4 mb-4 text-right">
      <div>
        <RoundedTextBox>
          <SmallSansSerifText>Cheilidhin</SmallSansSerifText>
        </RoundedTextBox>
      </div>
      <div>
        <RoundedTextBox>
          <SmallSansSerifText>Find the Mayor's Daughter</SmallSansSerifText>
        </RoundedTextBox>
      </div>
    </div>
  )
}

export default CampaignFavourites