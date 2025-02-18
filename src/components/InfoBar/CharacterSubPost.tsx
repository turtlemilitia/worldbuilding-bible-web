import { useCharacterForm } from '@/hooks/Forms'
import { SubPost } from '@/components/InfoBar/SubPost'
import React from 'react'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

type TProps = {
  characterId: number,
  unlink: () => any,
  disabled?: boolean,
}
export function CharacterSubPost ({ characterId, ...props }: TProps) {
  const { compendium } = useCurrentCompendium()
  const form = useCharacterForm({ characterId, compendiumId: compendium?.id })
  return <SubPost
    form={form}
    {...props}
  />
}