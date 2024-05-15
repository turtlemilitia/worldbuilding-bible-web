import { TCharacter } from '../../types'
import {
  destroyCharacter,
  storeCharacter,
  TCharacterRequest,
  updateCharacter,
  viewCharacter
} from '../../services/CharacterService'
import { attachLanguageToCharacter, detachLanguageFromCharacter } from '../../services/LanguageService'
import { attachFactionToCharacter, detachFactionFromCharacter } from '../../services/FactionService'
import { filterDataByKeys } from '../../utils/dataUtils'
import useFormHandling from '../useFormHandling'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { TUseForm, TUseFormProps } from '../../components/Post/types'

const useCharacterForm = ({
  isNew,
  persistedData,
  setPersistedData,
  updatePersistedData,
  resetPersistedData,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TUseFormProps<TCharacter>): TUseForm<TCharacter> => {

  // route
  const { compendiumId, characterId } = useParams() as { compendiumId: string; characterId: string } // router

  const include = useMemo(() => 'species;languages;factions', [])

  const mapData = (data: any): TCharacterRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
    content: data.content,
    speciesId: data.species?.id
  })

  const onFetch = () => viewCharacter(characterId, { include: `${include};notes;images` }).then(({ data }) => data.data)

  const onCreate = (data: TCharacter): Promise<TCharacter> => {
    return storeCharacter(compendiumId, mapData(data), { include })
      .then((response) => {
        const responseCharacter = response.data.data
        if (!data.languages && !data.factions) {
          return responseCharacter
        }

        const languageAttachmentPromises = data.languages?.map(language =>
          attachLanguageToCharacter(responseCharacter.slug, language.id)
            .then(response => response.data.data)
        ) || []

        const factionAttachmentPromises = data.factions?.map(faction =>
          attachFactionToCharacter(responseCharacter.slug, faction.id)
            .then(response => response.data.data)
        ) || []

        return Promise.all([...languageAttachmentPromises, ...factionAttachmentPromises])
          .then(() => {
            return filterDataByKeys(data, {
              ...responseCharacter,
              languages: data.languages,
              factions: data.factions
            })
          })
      })
  }

  const onUpdate = (data: TCharacter): Promise<TCharacter> => {
    if (!persistedData) {
      return Promise.reject()
    }
    return updateCharacter(characterId, mapData(data), { include })
      .then((response) => {
        const updatedCharacter = response.data.data

        // Determine languages to attach and detach
        const languagesToAttach = data.languages
          ?.filter(language => !persistedData.languages?.some(prevlanguage => prevlanguage.id === language.id)) || []
        const languagesToDetach = persistedData.languages
          ?.filter(language => !data.languages?.some(newLanguage => newLanguage.id === language.id)) || []

        // Determine factions to attach and detach
        const factionsToAttach = data.factions
          ?.filter(faction => !persistedData.factions?.some(prevfaction => prevfaction.id === faction.id)) || []
        const factionsToDetach = persistedData.factions
          ?.filter(faction => !data.factions?.some(newFaction => newFaction.id === faction.id)) || []

        // Create promises for attaching and detaching languages
        const attachLanguagePromises = languagesToAttach.map(language =>
          attachLanguageToCharacter(updatedCharacter.slug, language.id))
        const detachLanguagePromises = languagesToDetach.map(language =>
          detachLanguageFromCharacter(updatedCharacter.slug, language.slug))
        // Create promises for attaching and detaching factions
        const attachFactionPromises = factionsToAttach.map(faction =>
          attachFactionToCharacter(updatedCharacter.slug, faction.id))
        const detachFactionPromises = factionsToDetach.map(faction =>
          detachFactionFromCharacter(updatedCharacter.slug, faction.slug))

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
            })
          })
      })
  }

  const onDelete = () => destroyCharacter(characterId)

  return useFormHandling({
    isNew,
    mapData,

    // API
    onFetch,
    onCreate,
    onUpdate,
    onDelete,
    onFetched,
    onCreated,
    onUpdated,
    onDeleted,

    // persisted data
    persistedData,
    setPersistedData,
    updatePersistedData,
    resetPersistedData
  })
}

export default useCharacterForm;
