import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'
import { useSceneForm } from '@/hooks/Forms'
import { SubPost } from '@/components/InfoBar/SubPost'
import React from 'react'

type TProps = {
  sceneId: number,
  unlink: () => any,
  disabled?: boolean,
}
export function SceneSubPost ({ sceneId, ...props }: TProps) {
  const { campaign } = useCurrentCampaign()
  const form = useSceneForm({ sceneId, campaignId: campaign?.id })
  return <SubPost
    form={form}
    {...props}
  />
}