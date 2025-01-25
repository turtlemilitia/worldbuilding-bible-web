import { TQuest } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useQuestForm } from '../../hooks/Forms'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  questId: TQuest['id'];
  onCreated?: (data: TQuest) => any
  onUpdated?: (data: TQuest) => any
  onDeleted?: (id: string|number) => any
}
const QuestDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  questId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const form = useQuestForm({
    questId,
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(questId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Quest'}
      form={form}
    />
  )
}

export default QuestDialog
