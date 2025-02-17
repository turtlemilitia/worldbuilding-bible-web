import { useLocationForm } from '@/hooks/Forms'
import { SubPost } from '@/components/InfoBar/SubPost'
import React from 'react'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

type TProps = {
  locationId: number,
  unlink: () => any,
  disabled?: boolean,
}
export function LocationSubPost ({ locationId, ...props }: TProps) {
  const { compendium } = useCurrentCompendium()
  const form = useLocationForm({ locationId, compendiumId: compendium?.id })
  return <SubPost
    form={form}
    {...props}
  />
}