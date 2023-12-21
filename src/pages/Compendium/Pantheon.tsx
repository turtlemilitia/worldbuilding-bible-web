import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storePantheon, TPantheonRequest, updatePantheon, viewPantheon } from '../../services/PantheonService'
import { clearPantheonData, setPantheonData, updatePantheonData } from '../../reducers/compendium/pantheon/pantheonSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TPantheon, TLocationType } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'
import { indexSpecies } from '../../services/SpeciesService'

const Pantheon: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { pantheon } = useAppSelector((state: RootState) => state.pantheon) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, pantheonId } = useParams() as { compendiumId: string; pantheonId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = pantheonId === 'new'

  const reset = () => dispatch(clearPantheonData(undefined));

  const fetch = async () => {
    if (pantheonId && !isNew) {
      await viewPantheon(pantheonId, { include: 'compendium' })
        .then(response => {
          dispatch(setPantheonData(response.data.data))
        })
    }
    if (isNew) {
      reset()
    }
  }

  useEffect(() => {
    if (pantheonId && !isNew) {
      fetch()
    }
    if (isNew) {
      dispatch(clearPantheonData(undefined))
    }
    return () => {
      dispatch(clearPantheonData(undefined))
    }
  }, [pantheonId])

  const readyDataForRequest = (data: any): TPantheonRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TPantheon> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storePantheon(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setPantheonData(data.data))
          dispatch(addCompendiumChildData({ field: 'pantheons', data: data.data }))
          navigate(`/compendia/${compendiumId}/pantheons/${data.data.slug}`)
          return data.data
        })
    } else {
      return updatePantheon(pantheonId, validated)
        .then(({ data }) => {
          dispatch(updatePantheonData(data.data))
          dispatch(updateCompendiumChildData({ field: 'pantheons', data: data.data }))
          return data.data
        })
    }
  }

  const fields: TFields[] = []

  return (
    <Post
      key={pantheonId}
      ready={true}
      initialValues={pantheon as TPantheon}
      onSubmit={submit}
      onFetch={fetch}
      fields={fields}
      resetData={reset}
    />
  )
}

export default Pantheon
