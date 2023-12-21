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

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { encounter } = useAppSelector((state: RootState) => state.encounter) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, encounterId } = useParams() as { compendiumId: string; encounterId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = encounterId === 'new'

  const [ready, setReady] = useState<boolean>(false)
  const [species, setSpecies] = useState<TLocationType[]>([])

  const reset = () => dispatch(clearEncounterData(undefined));

  const fetch = async () => {
    if (encounterId && !isNew) {
      await viewEncounter(encounterId, { include: 'compendium' })
        .then(response => {
          dispatch(setEncounterData(response.data.data))
        })
    }
    if (isNew) {
      reset()
    }
  }

  useEffect(() => {

    if (compendium.slug) {
      indexSpecies(compendium.slug).then(response => setSpecies(response.data.data))
    }

  }, [compendium.slug])

  useEffect(() => {

    if (species.length) {
      setReady(true)
    }

  }, [species])

  useEffect(() => {
    if (encounterId && !isNew) {
      fetch()
    }
    if (isNew) {
      dispatch(clearEncounterData(undefined))
    }
    return () => {
      dispatch(clearEncounterData(undefined))
    }
  }, [encounterId])

  const readyDataForRequest = (data: any): TEncounterRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TEncounter> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeEncounter(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setEncounterData(data.data))
          dispatch(addCompendiumChildData({ field: 'encounters', data: data.data }))
          navigate(`/compendia/${compendiumId}/encounters/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateEncounter(encounterId, validated)
        .then(({ data }) => {
          dispatch(updateEncounterData(data.data))
          dispatch(updateCompendiumChildData({ field: 'encounters', data: data.data }))
          return data.data
        })
    }
  }

  const fields: TFields[] = []

  return (
    <Post
      key={encounterId}
      ready={ready}
      initialValues={encounter as TEncounter}
      onSubmit={submit}
      onFetch={fetch}
      fields={fields}
      resetData={reset}
    />
  )
}

export default Encounter
