import { useNoteForm } from '@/hooks/Forms'
import React from 'react'
import { SubPost } from '@/components/InfoBar/SubPost'

type TProps = {
  noteId: number,
  unlink: () => any,
  disabled?: boolean,
}
export function NoteSubPost ({ noteId, ...props }: TProps) {
  const form = useNoteForm({ noteId })
  return <SubPost
    form={form}
    {...props}
  />
}