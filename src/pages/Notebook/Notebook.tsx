import React, { FunctionComponent, JSX } from 'react'
import Post from '../../components/Post'
import { useNavigate, useParams } from 'react-router-dom'
import { useNotebookForm } from '../../hooks/Forms'

const Notebook: FunctionComponent = (): JSX.Element => {

  const { notebookId } = useParams() as { notebookId: string } // router

  const navigate = useNavigate()

  const form = useNotebookForm({
    notebookId,
    onCreated: (data) => navigate(`/notes/notebooks/${data.slug}`),
    onDeleted: () => navigate(`/notes/notebooks`)
  });

  return (
    <Post
      pageTypeName={'Notebook'}
      form={form}
    />
  )
}

export default Notebook
