import { TCharacter } from '../../../types'
import { TCharacterRequest } from '../../../services/ApiService/Compendia/CharacterService'
import { useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import { useCharacterDataManager } from '../../DataManagers'
import useCharacterFields from '../useCharacterForm/useCharacterFields'
import { usePostForm } from '../index'
import usePlayerCharacterHandler from '../../usePlayerCharacterHandler'

type TOwnProps = {
  characterId: TCharacter['slug'];
}
const useCharacterForm = ({
  characterId,
  onFetched,
  onCreated,
  onUpdated,
  onDeleted,
}: TOwnProps & TUseFormProps<TCharacter>): TForm<TCharacter> => {

  const include = useMemo(() => 'species;languages;factions;notes;encounters;quests;scenes;locations', [])

  const manager = useCharacterDataManager()

  const { fields } = useCharacterFields()

  const mapData = (data: any): TCharacterRequest => ({
    name: data.name,
    age: data.age,
    gender: data.gender,
    content: data.content,
    speciesId: data.species?.id
  })

  return {
    ...usePostForm({
      id: characterId,
      canHaveProfileImage: true,
      mapData,
      include,
      manager,
      fields,
      onFetched,
      onCreated,
      onUpdated,
      onDeleted,
    }),
    playerCharacterHandler: usePlayerCharacterHandler({ manager })
  }
}

export default useCharacterForm
