import { TQuest } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useQuestForm } from '../../hooks/Forms'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { fixId } from '@/utils/dataUtils'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  questId: string | number;
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

  const { campaign } = useCurrentCampaign();

  const form = useQuestForm({
    campaignId: campaign?.id,
    questId: fixId(questId),
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
