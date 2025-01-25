import { TSession } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useSessionForm } from '../../hooks/Forms'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  sessionId: TSession['id'];
  onCreated?: (data: TSession) => any
  onUpdated?: (data: TSession) => any
  onDeleted?: (id: string|number) => any
}
const SessionDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  sessionId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const form = useSessionForm({
    sessionId,
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(sessionId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Session'}
      form={form}
    />
  )
}

export default SessionDialog
