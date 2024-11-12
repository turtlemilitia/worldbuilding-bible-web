import React, { FunctionComponent, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Post from '../../../components/Post'
import { useNoteForm } from '../../../hooks/Forms'

const Note: FunctionComponent = () => {

  const navigate = useNavigate()
  const location = useLocation()

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

  useEffect(() => {
    if (location.state?.parent) {
      form.onFieldChange('parent', location.state.parent)
    }
  }, [form.data?.parent, location.state?.parent])

  return (
    <Post
      pageTypeName={'Note'}
      form={form}
    />
  )
}

export default Note
