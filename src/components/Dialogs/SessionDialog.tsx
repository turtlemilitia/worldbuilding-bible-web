import { TSession } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useSessionForm } from '../../hooks/Forms'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { fixId } from '@/utils/dataUtils'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  sessionId: string | number;
  onCreated?: (data: TSession) => any
  onUpdated?: (data: TSession) => any
  onDeleted?: (id: string|number) => any
}
const SessionDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  sessionId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const { campaign } = useCurrentCampaign();

  const form = useSessionForm({
    campaignId: campaign?.id,
    sessionId: fixId(sessionId),
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(sessionId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Session'}
      form={form}
    />
  )
}

export default SessionDialog
