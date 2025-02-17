import { useFactionForm } from '@/hooks/Forms'
import { SubPost } from '@/components/InfoBar/SubPost'
import React from 'react'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

type TProps = {
  factionId: number,
  unlink: () => any,
}
export function FactionSubPost ({ factionId, ...props }: TProps) {
  const { compendium } = useCurrentCompendium()
  const form = useFactionForm({ factionId, compendiumId: compendium?.id })
  return <SubPost
    form={form}
    {...props}
  />
}