import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storeCharacter, TCharacterRequest, updateCharacter, viewCharacter } from '../../services/CharacterService'
import { clearCharacterData, setCharacterData, updateCharacterData } from '../../reducers/compendium/character/characterSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumCharacterData,
  updateCompendiumCharacterData
} from '../../reducers/compendium/compendiumSlice'
import { TCharacter, TLocationType } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'
import { indexSpecies } from '../../services/SpeciesService'

const Character: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { character } = useAppSelector((state: RootState) => state.character) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, characterId } = useParams() as { compendiumId: string; characterId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = characterId === 'new'

  const [ready, setReady] = useState<boolean>(false)
  const [species, setSpecies] = useState<TLocationType[]>([])

  const reset = () => dispatch(clearCharacterData(undefined));

  const fetch = async () => {
    if (characterId && !isNew) {
      await viewCharacter(characterId, { include: 'compendium' })
        .then(response => {
          dispatch(setCharacterData(response.data.data))
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
    if (characterId && !isNew) {
      fetch()
    }
    if (isNew) {
      dispatch(clearCharacterData(undefined))
    }
    return () => {
      dispatch(clearCharacterData(undefined))
    }
  }, [characterId])

  const readyDataForRequest = (data: any): TCharacterRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
    content: data.content,
  })

  const submit = (data: any): Promise<TCharacter> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeCharacter(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setCharacterData(data.data))
          dispatch(addCompendiumCharacterData(data.data))
          navigate(`/compendia/${compendiumId}/characters/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateCharacter(characterId, validated)
        .then(({ data }) => {
          dispatch(updateCharacterData(data.data))
          dispatch(updateCompendiumCharacterData(data.data))
          return data.data
        })
    }
  }

  const fields: TFields[] = [
    {
      name: 'age',
      label: 'Age',
      type: 'number'
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'text'
    },
    {
      name: 'species',
      label: 'Species',
      type: 'select',
      options: species
    }
  ]

  return (
    <Post
      key={characterId}
      ready={ready}
      initialValues={character as TCharacter}
      name={character.name || ''}
      onSubmit={submit}
      onFetch={fetch}
      fields={fields}
      resetData={reset}
    />
  )
}

export default Character
