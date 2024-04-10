import React, { FunctionComponent, JSX, useContext, useEffect, useState } from 'react'
import {
  destroyEncounter,
  storeEncounter,
  TEncounterRequest,
  updateEncounter,
  viewEncounter
} from '../../../services/EncounterService'
import { clearEncounterData, setEncounterData, updateEncounterData } from '../../../reducers/campaign/encounter/encounterSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { useLocation, useParams } from 'react-router-dom'
import { RootState } from '../../../store'
import {
  addCampaignChildData,
  removeCampaignChildData,
  updateCampaignChildData
} from '../../../reducers/campaign/campaignSlice'
import { TEncounter } from '../../../types'
import Post from '../../../components/Post'
import { EncounterWrapperContext } from '../../../components/EncounterWrapper/component'

const Encounter: FunctionComponent = (): JSX.Element => {

  const { encounter } = useAppSelector((state: RootState) => state.encounter) // redux

  const dispatch = useAppDispatch() // redux

  const { state: locationState } = useLocation()

  const { campaignId, encounterId } = useParams() as { campaignId: string; encounterId: string } // router

  const [ready, setReady] = useState<boolean>(false)

  const types = useContext(EncounterWrapperContext);

  useEffect(() => {

    if (types !== undefined) {
      setReady(true)
    }

  }, [types])

  const readyDataForRequest = (data: any): TEncounterRequest => ({
    name: data.name,
    content: data.content,
    typeId: data.type.id,
  })

  return (
    <Post
      key={encounterId}
      isNew={encounterId === 'new'}
      pageTypeName={'Encounter'}
      pathToNew={(data) => `/campaigns/${campaignId}/encounters/${data.slug}`}
      pathAfterDelete={`/campaigns/${campaignId}`}
      canEdit={encounter.canUpdate}
      canDelete={encounter.canDelete}
      ready={ready}

      onFetch={() => viewEncounter(encounterId).then(({ data }) => data.data)}
      onCreate={(data: TEncounterRequest) => storeEncounter(campaignId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TEncounterRequest) => updateEncounter(encounterId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyEncounter(encounterId)}
      onCreated={(data) => {
        dispatch(addCampaignChildData({ field: 'encounters', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCampaignChildData({ field: 'encounters', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCampaignChildData({ field: 'encounters', id: encounterId }))
      }}

      fields={[
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          options: types ?? []
        }
      ]}

      defaultData={{ type: locationState?.type ? types?.find(type => type.id === locationState.type) : undefined }}

      persistedData={encounter as TEncounter}
      setPersistedData={(data) => dispatch(setEncounterData(data))}
      updatePersistedData={(data) => dispatch(updateEncounterData(data))}
      resetPersistedData={() => dispatch(clearEncounterData(undefined))}
    />
  )
}

export default Encounter
