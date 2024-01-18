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

  const navigate = useNavigate()

  const isNew: boolean = factionId === 'new'

  const readyDataForRequest = (data: any): TFactionRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
    content: data.content,
  })

  const submit = (data: any): Promise<TFaction> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeFaction(compendiumId, validated)
        .then(({ data }) => {
          dispatch(addCompendiumChildData({ field: 'factions', data: data.data }))
          navigate(`/compendia/${compendiumId}/factions/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateFaction(factionId, validated)
        .then(({ data }) => {
          dispatch(updateCompendiumChildData({ field: 'factions', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={factionId}
      isNew={isNew}
      remoteData={faction as TFaction}
      onSave={submit}
      onFetch={() => viewFaction(factionId, { include: 'compendium' }).then(({data}) => data.data)}
      fields={[]}
      ready={true}
      setRemoteData={(data) => dispatch(setFactionData(data))}
      resetData={() => dispatch(clearFactionData(undefined))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Faction
