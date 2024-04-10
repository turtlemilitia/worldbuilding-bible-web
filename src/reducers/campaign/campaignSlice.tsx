import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCampaign, TInvitation, TSession } from '../../types'

interface TState {
  campaign?: TCampaign;
}

const initialState: TState = {}

type TCampaignChildActionProps = {
  field: 'sessions'
  data: TSession;
}|{
  field: 'invitations'
  data: TInvitation;
}

type TCampaignRemoveChildActionProps = {
  field: 'sessions'
  id: TSession['slug'];
}

const campaignSlice: Slice<TState> = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    setCampaignData: (state, action: PayloadAction<TCampaign>) => {
      state.campaign = action.payload
    },
    updateCampaignData: (state, action: PayloadAction<TCampaign>) => {
      state.campaign = { ...state.campaign, ...action.payload }
    },
    addCampaignChildData: (state, action: PayloadAction<TCampaignChildActionProps>) => {
      const field = action.payload.field;
      if (state.campaign) {
        state.campaign = {
          ...state.campaign,
          [field]: [...(state.campaign[field] || []), action.payload.data]
        }
      }
    },
    updateCampaignChildData: (state, action: PayloadAction<TCampaignChildActionProps>) => {
      const field = action.payload.field;
      if (state.campaign) {
        state.campaign = {
          ...state.campaign,
          [field]: state.campaign[field]?.map(child => child.id === action.payload.data.id ? { ...child, ...action.payload.data } : child)
        }
      }
    },
    removeCampaignChildData: (state, action: PayloadAction<TCampaignRemoveChildActionProps>) => {
      const field = action.payload.field;
      if (state.campaign) {
        state.campaign = {
          ...state.campaign,
          [field]: state.campaign[field]?.filter(child => child.slug !== action.payload.id)
        }
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
  addCampaignChildData,
  updateCampaignChildData,
  removeCampaignChildData
} = campaignSlice.actions

export default campaignSlice.reducer