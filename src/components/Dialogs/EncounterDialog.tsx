import { TEncounter } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useEncounterForm } from '../../hooks/Forms'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  encounterId: TEncounter['slug'];
  onCreated?: (data: TEncounter) => any
  onUpdated?: (data: TEncounter) => any
  onDeleted?: (id: string|number) => any
}
const EncounterDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  encounterId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const form = useEncounterForm({
    encounterId,
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(encounterId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Encounter'}
      form={form}
    />
  )
}

export default EncounterDialog
