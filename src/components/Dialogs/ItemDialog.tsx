import { TItem } from '@/types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useItemForm } from '../../hooks/Forms'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'
import { fixId } from '@/utils/dataUtils'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  itemId: string | number;
  onCreated?: (data: TItem) => any
  onUpdated?: (data: TItem) => any
  onDeleted?: (id: string|number) => any
}
const ItemDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  itemId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const { compendium } = useCurrentCompendium()

  const form = useItemForm({
    compendiumId: compendium?.id,
    itemId: fixId(itemId),
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(itemId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Item'}
      form={form}
    />
  )
}

export default ItemDialog
