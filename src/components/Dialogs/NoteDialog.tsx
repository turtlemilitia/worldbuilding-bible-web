import { TNote } from '../../types'
import React, { FunctionComponent } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useNoteForm } from '../../hooks/Forms'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  noteId: TNote['slug'];
  onCreated?: (data: TNote) => any
  onUpdated?: (data: TNote) => any
  onDeleted?: (id: string|number) => any
}
const NoteDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  noteId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const form = useNoteForm({
    noteId,
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted(noteId)
    },
  });

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      pageTypeName={'Note'}
      form={form}
    />
  )
}

export default NoteDialog