import React, { JSX, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { LucideProps, StickyNoteIcon } from 'lucide-react'
import useNoteDataManager
  from '../../hooks/DataManagers/Notebooks/useNoteDataManager'
import {
  useNotebookDataManager,
  useNotebookIndexDataManager,
  useNoteIndexDataManager,
} from '@/hooks/DataManagers'

const NotebookWrapper = (): JSX.Element => {

  const { notebooks = [] } = useNotebookIndexDataManager() // redux
  const { notes = [] } = useNoteIndexDataManager() // redux
  const { destroy: destroyNotebook } = useNotebookDataManager() // redux
  const { destroy: destroyNote } = useNoteDataManager() // redux

  const navigate = useNavigate()

  useEffect(() => {
    if (notes?.length > 0) {
      navigate(`/notes/${notes[0]?.slug}`)
    } else {
      navigate(`/notes/new`)
    }
  }, [])

  const onDeleted = () => {
    navigate('notes')
  }

  return (
    <>
      <Sidebar
        title={'My Notes'}
        addNew={`/notes/notebooks/new`}
        items={[
          ...notebooks.map((notebook) => ({
            title: notebook.name,
            to: `/notebooks/${(notebook.slug)}`,
            icon: (props: LucideProps) =>
              <StickyNoteIcon {...props}/>,
            onDelete: () => destroyNotebook(notebook.slug),
            addNewLink: `/notes/new`,
            addNewLinkState: { notebook },
            children: notes.filter(note => note.notebook?.id === notebook.id).
              map((note) => ({
                title: note.name,
                to: `/notes/${note.slug}`,
                icon: (props: LucideProps) => <StickyNoteIcon {...props}/>,
                onDelete: () => destroyNote(note.slug)
                  .then(() => onDeleted()),
              })),
          })),
          ...notes.filter(note => !note.notebook).
              map((note) => ({
                title: note.name,
                to: `/notes/${note.slug}`,
                icon: (props: LucideProps) => <StickyNoteIcon {...props}/>,
                onDelete: () => destroyNote(note.slug)
                  .then(() => onDeleted()),
              })),
        ]}/>
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default NotebookWrapper