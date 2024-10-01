import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useNoteForm } from '../../../hooks/Forms'

const Note: FunctionComponent = () => {

  const navigate = useNavigate()

  const { noteId } = useParams() as { notebookId: string, noteId: string } // router

  const form = useNoteForm({
    noteId,
    onCreated: (data) => {
      navigate(`/notes/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/notes`)
    },
  })

  return (
    <Post
      pageTypeName={'Note'}
      form={form}
    />
  )
}

export default Note
