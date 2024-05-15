import { TNote, TNotebook } from '../../types'
import React, { FunctionComponent, useMemo } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useNoteForm } from '../../hooks/useNoteForm'
import useNoteDialogData from "./useNoteDialogData";

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  notebookId: TNotebook['slug'];
  noteId: TNote['slug'];
  onCreated?: (data: TNote) => any;
  onUpdated?: (data: Partial<TNote>) => any;
  onDeleted?: (id: TNote['slug']) => any;
}
const NoteDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  notebookId,
  noteId,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const isNew: boolean = useMemo(() => noteId === 'new', [noteId])

  const pageData = useNoteDialogData({
    notebookId,
    noteId,
    setIsOpen,
    onCreated,
    onUpdated,
    onDeleted
  })

  const form = useNoteForm({
    isNew,
    ...pageData
  });

  const canEdit: boolean = useMemo(() => isNew || pageData.persistedData?.canUpdate !== undefined, [isNew, pageData.persistedData?.canUpdate])

  return (
    <PostDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isNew={isNew}
      pageTypeName={'Character'}
      form={form}
      canEdit={canEdit}
    />
  )
}

export default NoteDialog
