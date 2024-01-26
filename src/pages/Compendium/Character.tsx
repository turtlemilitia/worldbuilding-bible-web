import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import {
  destroyCharacter,
  storeCharacter,
  TCharacterRequest,
  updateCharacter,
  viewCharacter
} from '../../services/CharacterService'
import { clearCharacterData, setCharacterData, updateCharacterData } from '../../reducers/compendium/character/characterSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TCharacter, TSpecies } from '../../types'
import Post from '../../components/Post'
import { TFields } from '../../components/InfoBar'
import { indexSpecies } from '../../services/SpeciesService'
import { attachLanguageToCharacter, detachLanguageFromCharacter, indexLanguages } from '../../services/LanguageService'
import { filterDataByKeys } from '../../utils/dataUtils'
import { attachFactionToCharacter, detachFactionFromCharacter, indexFactions } from '../../services/FactionService'

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
    },
    {
      name: 'languages',
      label: 'Languages',
      type: 'asyncMultiSelect',
      link: (id: string | number) => `/compendia/${compendium.slug}/languages/${id}`,
      search: (term: string) => indexLanguages(compendium.slug, { search: term })
        .then(response => response.data.data.map(language => ({
          id: language.id,
          slug: language.slug,
          name: language.name
        })))
    },
    {
      name: 'factions',
      label: 'Factions',
      type: 'asyncMultiSelect',
      link: (id: string | number) => `/compendia/${compendium.slug}/factions/${id}`,
      search: (term: string) => indexFactions(compendium.slug, { search: term })
        .then(response => response.data.data.map(faction => ({
          id: faction.id,
          slug: faction.slug,
          name: faction.name
        })))
    }
  ]

  const include = 'species,languages,factions'

  const handleCreate = (data: TCharacter): Promise<TCharacter> => {
    return storeCharacter(compendiumId, readyDataForRequest(data), { include })
      .then((response) => {
        const responseCharacter = response.data.data;
        if (!data.languages && !data.factions) {
          return responseCharacter;
        }

        const languageAttachmentPromises = data.languages?.map(language =>
          attachLanguageToCharacter(responseCharacter.slug, language.id)
            .then(response => response.data.data)
        ) || [];

        const factionAttachmentPromises = data.factions?.map(faction =>
          attachFactionToCharacter(responseCharacter.slug, faction.id)
            .then(response => response.data.data)
        ) || [];

        return Promise.all([...languageAttachmentPromises, ...factionAttachmentPromises])
          .then((languages) => {
            return filterDataByKeys(data, { ...responseCharacter, languages })
          });
      })
  }

  const handleUpdate = (data: TCharacter): Promise<TCharacter> => {
    return updateCharacter(characterId, readyDataForRequest(data), { include })
      .then((response) => {
        const updatedCharacter = response.data.data;

        // Determine languages to attach and detach
        const languagesToAttach = data.languages
          ?.filter(language => !character.languages?.some(prevlanguage => prevlanguage.id === language.id)) || [];
        const languagesToDetach = character.languages
          ?.filter(language => !data.languages?.some(newLanguage => newLanguage.id === language.id)) || [];

        // Determine factions to attach and detach
        const factionsToAttach = data.factions
          ?.filter(faction => !character.factions?.some(prevfaction => prevfaction.id === faction.id)) || [];
        const factionsToDetach = character.factions
          ?.filter(faction => !data.factions?.some(newFaction => newFaction.id === faction.id)) || [];

        // Create promises for attaching and detaching languages
        const attachLanguagePromises = languagesToAttach.map(language =>
          attachLanguageToCharacter(updatedCharacter.slug, language.id));
        const detachLanguagePromises = languagesToDetach.map(language =>
          detachLanguageFromCharacter(updatedCharacter.slug, language.slug));
        const attachFactionPromises = factionsToAttach.map(faction =>
          attachFactionToCharacter(updatedCharacter.slug, faction.id));
        const detachFactionPromises = factionsToDetach.map(faction =>
          detachFactionFromCharacter(updatedCharacter.slug, faction.slug));

        // Execute all promises
        return Promise.all([
          ...attachLanguagePromises,
          ...detachLanguagePromises,
          ...attachFactionPromises,
          ...detachFactionPromises
        ])
          .then(() => {
            // Assuming the updateCharacter and language attachment/detachment calls
            // modify the character, fetch or construct the updated character data
            return filterDataByKeys(data, {
              ...updatedCharacter,
              languages: data.languages,
              factions: data.factions
            });
          });
      });
  }

  return (
    <Post
      key={characterId}
      isNew={characterId === 'new'}
      pageTypeName={'Character'}
      pathToNew={(data) => `/compendia/${compendiumId}/characters/${data.slug}`}
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={ready}

      onFetch={() => viewCharacter(characterId, { include }).then(({ data }) => data.data)}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={() => destroyCharacter(characterId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'characters', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'characters', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'characters', id: characterId }))
      }}

      fields={fields}

      persistedData={character as TCharacter}
      setPersistedData={(data) => dispatch(setCharacterData(data))}
      updatePersistedData={(data) => dispatch(updateCharacterData(data))}
      resetPersistedData={() => dispatch(clearCharacterData(undefined))}
    />
  )
}

export default Character
