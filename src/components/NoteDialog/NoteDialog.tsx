import { TGenericPostBasic, TNote } from '../../types'
import React, { FunctionComponent, useEffect } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import useNoteDataManager from '../../hooks/DataManagers/Notebooks/useNoteDataManager'
import { useNoteForm } from '../../hooks/Forms'

type TProps<TEntity extends TGenericPostBasic> = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  noteId: TEntity['slug'];
  onCreated?: (data: TEntity) => any
  onUpdated?: (data: TEntity) => any
  onDeleted?: (id: string|number) => any
}
const NoteDialog: FunctionComponent<TProps<TNote & TGenericPostBasic>> = ({
  isOpen,
  setIsOpen,
  noteId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  // todo add other Dialogs
  // todo fix "delete" doesnt work
  // todo test sidebars

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
