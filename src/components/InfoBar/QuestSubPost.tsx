import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { useQuestForm } from '@/hooks/Forms'
import { SubPost } from '@/components/InfoBar/SubPost'
import React from 'react'

type TProps = {
  questId: number,
  unlink: () => any,
  disabled?: boolean,
}
export function QuestSubPost ({ questId, ...props }: TProps) {
  const { campaign } = useCurrentCampaign()
  const form = useQuestForm({ questId, campaignId: campaign?.id })
  return <SubPost
    form={form}
    {...props}
  />
}