import { TCampaign, TCompendium, TScene } from '@/types'
import { TSceneRequest } from '@/services/ApiService/Campaigns/SceneService'
import { useCallback, useMemo } from 'react'
import { TForm, TUseFormProps } from '@/components/Post/types'
import usePostForm from '../usePostForm'
import { useSceneDataManager } from '../../DataManagers'
import useSceneFields from './useSceneFields'
import useLink from '@/hooks/useLink'

type TOwnProps = {
  campaignId?: TCampaign['id'];
  sceneId?: TScene['id'];
}
const useSceneForm = ({ campaignId, sceneId, onFetched, onCreated, onUpdated, onDeleted }: TOwnProps & TUseFormProps<TScene>): TForm<TScene> => {

  const include = useMemo(() => 'encounters;notes;quests;characters;locations',
    [])

  const manager = useSceneDataManager(campaignId, sceneId)

  const { fields } = useSceneFields(manager)

  const mapData = useCallback((data: any): TSceneRequest => ({
    name: data.name,
    content: data.content,
    completedAt: data.completedAt,
  }), [])

  return usePostForm<TScene, TSceneRequest>({
    id: sceneId,
    mapData,
    include,
    manager,
    fields,

    onFetched,
    onCreated,
    onUpdated,
    onDeleted,
    link: sceneId ? useLink('scenes', sceneId) : '',
  })
}

export default useSceneForm
