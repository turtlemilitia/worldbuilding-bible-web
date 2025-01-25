import { TFaction } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useFactionForm } from '../../hooks/Forms'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  factionId: TFaction['id'];
  onCreated?: (data: TFaction) => any
  onUpdated?: (data: TFaction) => any
  onDeleted?: (id: string|number) => any
}
const FactionDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  factionId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const form = useFactionForm({
    factionId,
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(factionId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Faction'}
      form={form}
    />
  )
}

export default FactionDialog
