import { TScene } from '../../../types'
import { TSceneRequest } from '../../../services/ApiService/Campaigns/SceneService'
import { useCallback, useMemo } from 'react'
import { TForm, TUseFormProps } from '../../../components/Post/types'
import usePostForm from '../usePostForm'
import { useSceneDataManager } from '../../DataManagers'
import useSceneFields from './useSceneFields'

type TOwnProps = {
  sceneId: TScene['slug'];
}
const useSceneForm = ({ sceneId, onFetched, onCreated, onUpdated, onDeleted }: TOwnProps & TUseFormProps<TScene>): TForm<TScene> => {

  const include = useMemo(() => 'encounters;notes;quests', [])

  const manager = useSceneDataManager();

  const { fields } = useSceneFields();

  const mapData = useCallback((data: any): TSceneRequest => ({
    name: data.name,
    content: data.content,
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
    onDeleted
  })
}

export default useSceneForm;
