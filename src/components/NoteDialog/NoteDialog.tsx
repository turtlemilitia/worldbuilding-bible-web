import { TGenericPostBasic, TNote } from '../../types'
import React, { FunctionComponent, useMemo } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import useNoteDataManager from '../../hooks/DataManagers/Notebooks/useNoteDataManager'
import { useNoteForm } from '../../hooks/Forms'

type TProps<TEntity extends TGenericPostBasic> = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  noteId: TNote['slug'];
  onCreated?: (data: any) => any
  onUpdated?: (data: any) => any
  onDeleted?: (id: string|number) => any
}
const NoteDialog: FunctionComponent<TProps<any & TGenericPostBasic>> = ({
  isOpen,
  setIsOpen,
  noteId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const { note } = useNoteDataManager();

  const form = useNoteForm({
    noteId,
    onCreated,
    onUpdated,
    onDeleted: () => {
      setIsOpen(false)
      onDeleted && onDeleted((note as TNote).slug)
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
