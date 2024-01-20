import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCampaign } from '../../types'

interface TState {campaigns: TCampaign[]}

const initialState: TState = {
  campaigns: []
}

const campaignsIndexSlice: Slice<TState> = createSlice({
  name: 'campaignsIndex',
  initialState,
  reducers: {
    setCampaigns: (state, action: PayloadAction<TCampaign[]>) => {
      state.campaigns = [...action.payload]
    },
    addCampaign: (state, action: PayloadAction<TCampaign>) => {
      state.campaigns = [...state.campaigns, action.payload]
    },
    removeCampaign: (state, action: PayloadAction<{ id: TCampaign['slug'] }>) => {
      state.campaigns = state.campaigns.filter((campaign: TCampaign) => campaign.slug !== action.payload.id)
    },
    clearCampaigns: (state) => {
      state.campaigns = initialState.campaigns
    }
  }
})

export const { setCampaigns, addCampaign, removeCampaign, clearCampaigns } = campaignsIndexSlice.actions

export default campaignsIndexSlice.reducer