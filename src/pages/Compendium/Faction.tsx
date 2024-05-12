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
import useUrlFormatter from '../../hooks/useUrlFormatter'
import { TField } from '../../hooks/useFields'

const include = 'characters';

const Faction: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate();

  const { compendiumId, factionId } = useParams() as { compendiumId: string; factionId: string } // router

  const { faction } = useAppSelector((state: RootState) => state.faction) // redux

  const {compendiumPath} = useUrlFormatter()

  const readyDataForRequest = (data: any): TFactionRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
    content: data.content,
  })

  const fields: TField[] = [
    {
      label: 'Characters',
      name: 'characters',
      type: 'list'
    }
  ]

  return (
    <Post
      key={factionId}
      isNew={factionId === 'new'}
      pageTypeName={'Faction'}
      canEdit={faction.canUpdate}
      canDelete={faction.canDelete}
      ready={true}

      onFetch={() => viewFaction(factionId, {include}).then(({ data }) => data.data)}
      onCreate={(data: TFactionRequest) => storeFaction(compendiumId, readyDataForRequest(data), {include}).then(({ data }) => data.data)}
      onUpdate={(data: TFactionRequest) => updateFaction(factionId, readyDataForRequest(data), {include}).then(({ data }) => data.data)}
      onDelete={() => destroyFaction(factionId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'factions', data: data }))
        navigate(`${compendiumPath}/factions/${data.slug}`)
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'factions', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'factions', id: factionId }))
        navigate(compendiumPath)
      }}

      fields={fields}

      persistedData={faction as TFaction}
      setPersistedData={(data) => dispatch(setFactionData(data))}
      updatePersistedData={(data) => dispatch(updateFactionData(data))}
      resetPersistedData={() => dispatch(clearFactionData(undefined))}
    />
  )
}

export default Faction
