import React, { FunctionComponent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useNoteForm } from '../../../hooks/Forms'

const Note: FunctionComponent = () => {

  const navigate = useNavigate()

  const { notebookId, noteId } = useParams() as { notebookId: string, noteId: string } // router

  const form = useNoteForm({
    noteId,
    onCreated: (data) => {
      navigate(`/notebooks/${notebookId}/systems/${data.slug}`)
    },
    onDeleted: () => {
      navigate(`/notebooks/${notebookId}/systems`)
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
