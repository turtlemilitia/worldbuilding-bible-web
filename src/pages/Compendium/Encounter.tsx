import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storeEncounter, TEncounterRequest, updateEncounter, viewEncounter } from '../../services/EncounterService'
import { clearEncounterData, setEncounterData, updateEncounterData } from '../../reducers/compendium/encounter/encounterSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TEncounter, TLocationType } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'
import { indexSpecies } from '../../services/SpeciesService'

const Encounter: FunctionComponent = (): JSX.Element => {

  const { encounter } = useAppSelector((state: RootState) => state.encounter) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, encounterId } = useParams() as { compendiumId: string; encounterId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = encounterId === 'new'

  const readyDataForRequest = (data: any): TEncounterRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TEncounter> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeEncounter(compendiumId, validated)
        .then(({ data }) => {
          dispatch(addCompendiumChildData({ field: 'encounters', data: data.data }))
          navigate(`/compendia/${compendiumId}/encounters/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateEncounter(encounterId, validated)
        .then(({ data }) => {
          dispatch(updateCompendiumChildData({ field: 'encounters', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={encounterId}
      isNew={isNew}
      ready={true}
      remoteData={encounter as TEncounter}
      onSave={submit}
      onFetch={() => viewEncounter(encounterId, { include: 'compendium' }).then(({data}) => data.data)}
      fields={[]}
      setRemoteData={(data) => dispatch(setEncounterData(data))}
      resetData={() => dispatch(clearEncounterData(undefined))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Encounter
