import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { useEncounterForm } from '@/hooks/Forms'
import { SubPost } from '@/components/InfoBar/SubPost'
import React from 'react'

type TProps = {
  encounterId: number,
  unlink: () => any,
  disabled?: boolean,
}
export function EncounterSubPost ({ encounterId, ...props }: TProps) {
  const { campaign } = useCurrentCampaign()
  const form = useEncounterForm({ encounterId, campaignId: campaign?.id })
  return <SubPost
    form={form}
    {...props}
  />
}