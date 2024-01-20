import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import {
  destroyEncounter,
  storeEncounter,
  TEncounterRequest,
  updateEncounter,
  viewEncounter
} from '../../services/EncounterService'
import { clearEncounterData, setEncounterData, updateEncounterData } from '../../reducers/compendium/encounter/encounterSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TEncounter } from '../../types'
import Post from '../../components/Post'
const Encounter: FunctionComponent = (): JSX.Element => {

  const { encounter } = useAppSelector((state: RootState) => state.encounter) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, encounterId } = useParams() as { compendiumId: string; encounterId: string } // router

  const readyDataForRequest = (data: any): TEncounterRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={encounterId}
      isNew={encounterId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/encounters/${data.slug}`}
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={true}

      onFetch={() => viewEncounter(encounterId).then(({ data }) => data.data)}
      onCreate={(data: TEncounterRequest) => storeEncounter(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TEncounterRequest) => updateEncounter(encounterId, data).then(({ data }) => data.data)}
      onDelete={() => destroyEncounter(encounterId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'encounters', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'encounters', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'encounters', id: encounterId }))
      }}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={encounter as TEncounter}
      setPersistedData={(data) => dispatch(setEncounterData(data))}
      updatePersistedData={(data) => dispatch(updateEncounterData(data))}
      resetPersistedData={() => dispatch(clearEncounterData(undefined))}
    />
  )
}

export default Encounter
