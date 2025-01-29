import { TScene } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useSceneForm } from '../../hooks/Forms'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { fixId } from '@/utils/dataUtils'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  sceneId: string | number;
  onCreated?: (data: TScene) => any
  onUpdated?: (data: TScene) => any
  onDeleted?: (id: string|number) => any
}
const SceneDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  sceneId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const { campaign } = useCurrentCampaign();

  const form = useSceneForm({
    campaignId: campaign?.id,
    sceneId: fixId(sceneId),
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(sceneId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Scene'}
      form={form}
    />
  )
}

export default SceneDialog
