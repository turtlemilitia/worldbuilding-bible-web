import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import { storeCharacter, TCharacterRequest, updateCharacter, viewCharacter } from '../../services/CharacterService'
import { clearCharacterData, setCharacterData, updateCharacterData } from '../../reducers/compendium/character/characterSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TCharacter, TSpecies } from '../../types'
import Post from '../../components/Post'
import { TFields } from '../../components/InfoBar'
import { indexSpecies } from '../../services/SpeciesService'

const Character: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, characterId } = useParams() as { compendiumId: string; characterId: string } // router

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { character } = useAppSelector((state: RootState) => state.character) // redux

  const [ready, setReady] = useState<boolean>(false)
  const [species, setSpecies] = useState<TSpecies[]>([])

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

  const readyDataForRequest = (data: any): TCharacterRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
    content: data.content,
    speciesId: data.species?.id
  })

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
      isNew={characterId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/characters/${data.slug}`}
      ready={ready}

      onCreate={(data: TCharacterRequest) => storeCharacter(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TCharacterRequest) => updateCharacter(characterId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'characters', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'characters', data: data }))
      }}
      onFetch={() => viewCharacter(characterId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={fields}

      persistedData={character as TCharacter}
      setPersistedData={(data) => dispatch(setCharacterData(data))}
      updatePersistedData={(data) => dispatch(updateCharacterData(data))}
      resetPersistedData={() => dispatch(clearCharacterData(undefined))}
    />
  )
}

export default Character
