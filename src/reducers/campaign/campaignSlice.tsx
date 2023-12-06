import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCampaign, TSession } from '../../types'

interface TState {
  campaign: TCampaign;
}

const initialState: TState = {
  campaign: {
    name: '',
    content: '',
    hasSessions: false,
    sessions: []
  }
}

const campaignSlice: Slice<TState> = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampaignData: (state, action: PayloadAction<TCampaign>) => {
      state.campaign = action.payload
    },
    updateCampaignData: (state, action: PayloadAction<Partial<TCampaign>>) => {
      state.campaign = { ...state.campaign, ...action.payload }
    },
    addCampaignSessionData: (state, action: PayloadAction<TSession>) => {
      state.campaign = {
        ...state.campaign,
        hasSessions: true,
        sessions: [...(state.campaign.sessions || []), action.payload]
      }
    },
    updateCampaignSessionData: (state, action: PayloadAction<TSession>) => {
      state.campaign = {
        ...state.campaign,
        sessions: state.campaign.sessions?.map(session => session.id === action.payload.id ? { ...session, ...action.payload } : session)
      }
    },
    clearCampaignData: (state) => {
      state.campaign = initialState.campaign
    }
  }
})

export const {
  setCampaignData,
  updateCampaignData,
  clearCampaignData,
  addCampaignSessionData,
  updateCampaignSessionData
} = campaignSlice.actions

export default campaignSlice.reducer