import { TCampaign } from '../../types'
import createIndexSlice from '../createIndexSlice'

export const campaignsIndexSlice = createIndexSlice<TCampaign>('campaignsIndex')

export default campaignsIndexSlice.reducer