import { TScene } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useSceneForm } from '../../hooks/Forms'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  sceneId: TScene['slug'];
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

  const form = useSceneForm({
    sceneId,
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
