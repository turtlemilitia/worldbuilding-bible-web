import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { useSessionForm } from '@/hooks/Forms'
import { SubPost } from '@/components/InfoBar/SubPost'
import React from 'react'

type TProps = {
  sessionId: number,
  unlink: () => any,
  disabled?: boolean,
}
export function SessionSubPost ({ sessionId, ...props }: TProps) {
  const { campaign } = useCurrentCampaign()
  const form = useSessionForm({ sessionId, campaignId: campaign?.id })
  return <SubPost
    form={form}
    {...props}
  />
}