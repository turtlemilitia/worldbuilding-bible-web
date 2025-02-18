import { TCharacter } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useCharacterForm } from '../../hooks/Forms'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'
import { fixId } from '@/utils/dataUtils'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  characterId: string | number;
  onCreated?: (data: TCharacter) => any
  onUpdated?: (data: TCharacter) => any
  onDeleted?: (id: string|number) => any
}
const CharacterDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  characterId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const { compendium } = useCurrentCompendium()

  const form = useCharacterForm({
    compendiumId: compendium?.id,
    characterId: fixId(characterId),
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(characterId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Character'}
      form={form}
    />
  )
}

export default CharacterDialog
