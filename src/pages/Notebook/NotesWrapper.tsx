import React, { JSX, useEffect, useMemo } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import {
  BookIcon,
  LucideProps,
  PenBoxIcon,
  StickyNoteIcon,
} from 'lucide-react'
import useNoteDataManager
  from '../../hooks/DataManagers/Notebooks/useNoteDataManager'
import {
  useNotebookDataManager,
  useNotebookIndexDataManager,
  useNoteIndexDataManager,
} from '@/hooks/DataManagers'
import SidebarSection from '@/components/Sidebar/SidebarSection'
import { createNestedArray } from '@/utils/treeUtils'
import { TNote } from '@/types'

const NotesWrapper = (): JSX.Element => {

  const { campaignId, noteId } = useParams() // redux
  const { notebooks = [] } = useNotebookIndexDataManager() // redux
  const { notes = [] } = useNoteIndexDataManager() // redux
  const { destroy: destroyNotebook } = useNotebookDataManager() // redux
  const { destroy: destroyNote } = useNoteDataManager() // redux

  const navigate = useNavigate()

  const prefix = useMemo(() => campaignId ? `/campaigns/${campaignId}` : '',
    [campaignId])

  useEffect(() => {
    if (!noteId) {
      if (notes?.length > 0) {
        navigate(`${prefix}/notes/${notes[0]?.slug}`)
      } else {
        navigate(`${prefix}/notes/new`)
      }
    }
  }, [])

  const onDeleted = () => {
    navigate(`${prefix}/notes`)
  }

  const mapNote = (note: TNote): SidebarItemInterface => ({
    title: note.name,
    to: `${prefix}/notes/${note.slug}`,
    addNewLink: `${prefix}/notes/new`,
    addNewLinkState: { parent: note },
    icon: (props: LucideProps) => <PenBoxIcon {...props}/>,
    onDelete: () => destroyNote(note.slug).then(() => onDeleted()),
    children: note.children?.map(subNote => mapNote(subNote))
  })

  return (
    <>
      <Sidebar
        title={'My Notes'}
        canAdd={true}
        addNew={`${prefix}/notes/new`}
      >
        <SidebarSection
          items={[
            ...notebooks.map((notebook) => ({
              title: notebook.name,
              to: `${prefix}/notes/notebooks/${(notebook.slug)}`,
              icon: (props: LucideProps) =>
                <BookIcon {...props}/>,
              onDelete: () => destroyNotebook(notebook.slug),
              addNewLink: `${prefix}/notes/new`,
              addNewLinkState: { notebook },
              children: notes.filter(note => note.notebook?.id === notebook.id).
                map((note) => ({
                  title: note.name,
                  to: `${prefix}/notes/${note.slug}`,
                  icon: (props: LucideProps) => <StickyNoteIcon {...props}/>,
                  onDelete: () => destroyNote(note.slug).
                    then(() => onDeleted()),
                })),
            })),
            ...createNestedArray(notes.filter(note => !note.notebook)).
              map((note) => mapNote(note)),
          ]}/>
      </Sidebar>
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default NotesWrapper