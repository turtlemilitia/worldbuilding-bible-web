import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import { BookIcon, StickyNoteIcon } from 'lucide-react'
import { TGenericPostBasic, TNotebook } from '../../types'
import { useNotebookIndexDataManager } from '../../hooks/DataManagers'
import useNoteDataManager from '../../hooks/DataManagers/Notebooks/useNoteDataManager'

const NotebooksWrapper = (): JSX.Element => {

  const { notebooks } = useNotebookIndexDataManager() // redux
  const { destroy: destroyNote } = useNoteDataManager() // redux

  const mapNote = (notebook: TNotebook, note: TGenericPostBasic): SidebarItemInterface => ({
    title: note.name,
    to: `/notebooks/${notebook?.slug}/notes/${note.slug}`,
    onDelete: () => note.slug && destroyNote(note.slug),
    icon: (props) => <StickyNoteIcon {...props}/>,
})

  return (
    <>
      {notebooks && notebooks.length >= 1 && (
        <Sidebar
          title={'Notebooks'}
          items={notebooks.map((notebook) => ({
            title: notebook.name,
            to: `/notebooks/${(notebook.slug)}`,
            icon: (props) => <BookIcon {...props}/>,
            addNewLink: `/notebooks/${(notebook.slug)}/notes/new`,
            children: notebook.notes?.map(note => mapNote(notebook, note)),
          }))}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default NotebooksWrapper