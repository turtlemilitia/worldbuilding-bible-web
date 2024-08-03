import { TCampaign } from '../../types'
import createIndexSlice from '../createIndexSlice'

export const campaignsIndexSlice = createIndexSlice<TCampaign>('campaign')

export default campaignsIndexSlice.reducer