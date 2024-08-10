import React, { JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useNotebookDataManager } from '../../hooks/DataManagers'
import Sidebar from '../../components/Sidebar/Sidebar'
import { StickyNoteIcon } from 'lucide-react'
import useNoteDataManager from '../../hooks/DataManagers/Notebooks/useNoteDataManager'
import { notebookIncludes } from '../../hooks/Forms/useNotebookForm/useNotebookForm'

const NotebookWrapper = (): JSX.Element => {

  const { notebook, view, clearData } = useNotebookDataManager() // redux
  const { destroy: destroyNote } = useNoteDataManager() // redux

  const { notebookId } = useParams() as { notebookId: string } // router

  useEffect(() => {
    const isNew: boolean = notebookId === 'new'
    if (!isNew) {
      view(notebookId, {include: notebookIncludes})
    }
    return () => {
      clearData(notebookId)
    }
  }, [notebookId])

  return (
    <>
      {notebook && (
        <Sidebar
          title={notebook.name}
          addNew={`/notebooks/${(notebook.slug)}/notes/new`}
          items={notebook.notes.map((note) => ({
            title: note.name,
            to: `/notebooks/${(notebook.slug)}/notes/${note.slug}`,
            icon: (props) => <StickyNoteIcon {...props}/>,
            onDelete: () => destroyNote(note.slug)
          }))}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default NotebookWrapper