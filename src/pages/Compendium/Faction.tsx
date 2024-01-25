import React, { FunctionComponent, JSX } from 'react'
import {
  destroyFaction,
  storeFaction,
  TFactionRequest,
  updateFaction,
  viewFaction
} from '../../services/FactionService'
import {
  clearFactionData,
  setFactionData,
  updateFactionData
} from '../../reducers/compendium/faction/factionSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
import { TFaction } from '../../types'

const Faction: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, factionId } = useParams() as { compendiumId: string; factionId: string } // router

  const { faction } = useAppSelector((state: RootState) => state.faction) // redux

  const readyDataForRequest = (data: any): TFactionRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
    content: data.content,
  })

  return (
    <Post
      key={factionId}
      isNew={factionId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/factions/${data.slug}`}
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={true}

      onFetch={() => viewFaction(factionId).then(({ data }) => data.data)}
      onCreate={(data: TFactionRequest) => storeFaction(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TFactionRequest) => updateFaction(factionId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyFaction(factionId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'factions', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'factions', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'factions', id: factionId }))
      }}

      fields={[]}

      persistedData={faction as TFaction}
      setPersistedData={(data) => dispatch(setFactionData(data))}
      updatePersistedData={(data) => dispatch(updateFactionData(data))}
      resetPersistedData={() => dispatch(clearFactionData(undefined))}
    />
  )
}

export default Faction
