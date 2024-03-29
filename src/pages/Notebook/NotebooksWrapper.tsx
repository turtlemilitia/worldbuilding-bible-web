import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import { BookIcon, StickyNoteIcon } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import { updateNotebookData } from '../../reducers/notebook/notebookSlice'
import { destroyNote, indexNotes } from '../../services/NoteService'
import { TGenericPostList, TNote, TNotebook } from '../../types'
import { removeNotebooksNotebookNote, updateNotebooksNotebookData } from '../../reducers/notebook/notebooksIndexSlice'

const NotebooksWrapper = (): JSX.Element => {

  const dispatch = useAppDispatch();

  const { notebooks } = useAppSelector((state: RootState) => state.notebooks) // redux

  const mapNote = (notebook: TNotebook, note: TGenericPostList): SidebarItemInterface => ({
    title: note.name,
    to: `/notebooks/${notebook?.slug}/notes/${note.slug}`,
    onDelete: () => note.slug && destroyNote(note.slug)
      .then(() => dispatch(removeNotebooksNotebookNote({ slug: notebook?.slug, noteId: note.id }))),
    icon: (props) => <StickyNoteIcon {...props}/>,
})

  return (
    <>
      {notebooks.length >= 1 && (
        <Sidebar
          title={'Notebooks'}
          items={notebooks.map((notebook) => ({
            title: notebook.name,
            to: `/notebooks/${(notebook.slug)}`,
            icon: (props) => <BookIcon {...props}/>,
            addNewLink: `/notebooks/${(notebook.slug)}/notes/new`,
            children: notebook.notes?.map(note => mapNote(notebook, note)),
            loadChildren: () => {
              indexNotes(notebook.slug)
                .then(({ data }) => {
                  dispatch(updateNotebooksNotebookData({ ...notebook, notes: data.data }))
                })
            }
          }))}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default NotebooksWrapper