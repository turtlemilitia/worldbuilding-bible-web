import { TNote, TNotebook } from '../../types'
import React, { FunctionComponent, useMemo } from 'react'
import PostDialog from '../PostDialog/PostDialog'
import { useNoteDialogForm } from '../../hooks/useNoteDialogForm'

type TProps = {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any;
  notebookId: TNotebook['slug'];
  id: TNote['slug'];
  onCreated?: (data: TNote) => any;
  onUpdated?: (data: TNote) => any;
  onDeleted?: (id: TNote['slug']) => any;
}
const NoteDialog: FunctionComponent<TProps> = ({
  isOpen,
  setIsOpen,
  notebookId,
  id,
  onCreated,
  onUpdated,
  onDeleted
}) => {

  const isNew: boolean = useMemo(() => id === 'new', [id])

  const form = useNoteDialogForm({
    isNew,
    isOpen,
    setIsOpen,
    notebookId,
    id,
    onCreated,
    onUpdated,
    onDeleted
  });

  const canEdit: boolean = useMemo(() => isNew || form.persistedData?.canUpdate !== undefined, [isNew, form.persistedData?.canUpdate])

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