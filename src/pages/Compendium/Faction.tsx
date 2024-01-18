import React, { FunctionComponent, JSX } from 'react'
import { storeFaction, TFactionRequest, updateFaction, viewFaction } from '../../services/FactionService'
import {
  clearFactionData,
  setFactionData,
  updateFactionData
} from '../../reducers/compendium/faction/factionSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
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
      ready={true}

      onCreate={(data: TFactionRequest) => storeFaction(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TFactionRequest) => updateFaction(factionId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'factions', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'factions', data: data }))
      }}
      onFetch={() => viewFaction(factionId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={faction as TFaction}
      setPersistedData={(data) => dispatch(setFactionData(data))}
      updatePersistedData={(data) => dispatch(updateFactionData(data))}
      resetPersistedData={() => dispatch(clearFactionData(undefined))}
    />
  )
}

export default Faction
