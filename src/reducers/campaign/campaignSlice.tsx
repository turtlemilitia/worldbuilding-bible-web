import { TCampaign } from '../../types'
import createEntitySlice from '../createEntitySlice'

export const campaignSlice = createEntitySlice<TCampaign>('campaign')

export default campaignSlice.reducer