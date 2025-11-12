import { TStory } from '@/types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useStoryForm } from '../../hooks/Forms'
import { fixId } from '@/utils/dataUtils'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  storyId: string | number;
  onCreated?: (data: TStory) => any
  onUpdated?: (data: TStory) => any
  onDeleted?: (id: string | number) => any
}
const StoryDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  storyId,
  onCreated,
  onUpdated,
  onDeleted,
}) => {

  const { compendium } = useCurrentCompendium()

  const form = useStoryForm({
    compendiumId: compendium?.id,
    storyId: fixId(storyId),
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(storyId)
    },
  })

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Story'}
      form={form}
    />
  )
}

export default StoryDialog
