import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit'

import { TCampaign, TSession, TTypesAllowed } from '../../types'

interface TState {
  campaign: TCampaign;
}

const initialState: TState = {
  campaign: {
    name: '',
    content: '',
    visibility: {
      id: 1,
      name: 'Public'
    },
    hasSessions: false,
    sessions: []
  }
}

type TCampaignChildActionProps = {
  field: 'sessions'
  data: TSession;
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
    updateCampaignData: (state, action: PayloadAction<Partial<TCampaign>>) => {
      state.campaign = { ...state.campaign, ...action.payload }
    },
    addCampaignChildData: (state, action: PayloadAction<TCampaignChildActionProps>) => {
      const field = action.payload.field;
      state.campaign = {
        ...state.campaign,
        [`has${field[0].toUpperCase() + field.slice(1)}`]: true,
        [field]: [...(state.campaign[field] || []), action.payload.data]
      }
    },
    updateCampaignChildData: (state, action: PayloadAction<TCampaignChildActionProps>) => {
      const field = action.payload.field;
      state.campaign = {
        ...state.campaign,
        [field]: state.campaign[field]?.map(child => child.id === action.payload.data.id ? { ...child, ...action.payload.data } : child)
      }
    },
    removeCompendiumChildData: (state, action: PayloadAction<TCampaignRemoveChildActionProps>) => {
      const field = action.payload.field;
      state.campaign = {
        ...state.campaign,
        [field]: state.campaign[field]?.filter(child => child.slug !== action.payload.id)
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
  updateCampaignChildData
} = campaignSlice.actions

export default campaignSlice.reducer