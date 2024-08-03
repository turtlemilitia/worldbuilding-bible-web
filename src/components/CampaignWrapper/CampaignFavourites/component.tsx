import { FunctionComponent, useEffect, useState } from 'react'
import { TCampaignFavouritesProps } from './types'
import { RoundedTextBox } from '../../RoundedTextBox'
import SmallSansSerifText from '../../SmallSansSerifText'
import { useCampaignDataManager } from '../../../hooks/DataManagers'

const CampaignFavourites: FunctionComponent<TCampaignFavouritesProps> = () => {

  const { campaign } = useCampaignDataManager()

  const [show, setShow] = useState<boolean>(false)
  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <div className="relative flex w-full">
      <div className={`fixed z-50 top-28 right-0 pt-5 w-1/4`}>
        <div
          className={`absolute transition-all duration-1000 ${show ? 'top-5 opacity-100' : '-top-14 opacity-0'} w-full px-6`}>
          <div className="flex-1 items-end space-y-4 text-right">
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
        </div>
      </div>
    </div>
  )
}

export default CampaignFavourites