import React, { JSX, useEffect, useMemo } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Sidebar, { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import {
  LucideProps,
  PenBoxIcon,
} from 'lucide-react'
import useNoteDataManager
  from '@/hooks/DataManagers/Notes/useNoteDataManager'
import {
  useNoteIndexDataManager,
} from '@/hooks/DataManagers'
import SidebarSection from '@/components/Sidebar/SidebarSection'
import { createNestedArray } from '@/utils/treeUtils'
import { TNote } from '@/types'
import { makeLink } from '@/hooks/useLink'

const NotesWrapper = (): JSX.Element => {

  const { campaignId, noteId } = useParams() // redux
  const { notes = [] } = useNoteIndexDataManager() // redux
  const { destroy: destroyNote } = useNoteDataManager() // redux

  const navigate = useNavigate()

  const prefix = useMemo(() => campaignId ? `/campaigns/${campaignId}` : '',
    [campaignId])

  useEffect(() => {
    if (!noteId) {
      if (notes?.length > 0) {
        navigate(`${prefix}/notes/${notes[0]?.id}/${notes[0]?.slug}`)
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
    to: makeLink('notes', note.id, note.slug, '', prefix),
    addNewLink: `${prefix}/notes/new`,
    addNewLinkState: { parent: note },
    icon: (props: LucideProps) => <PenBoxIcon {...props}/>,
    onDelete: () => destroyNote(note.id).then(() => onDeleted()),
    children: note.children?.map(subNote => mapNote(subNote)),
  })

  return (
    <>
      <Sidebar
        title={'My Notes'}
        canAdd={true}
        addNew={`${prefix}/notes/new`}
      >
        <SidebarSection
          items={
            createNestedArray(notes).
              map((note) => mapNote(note))
          }/>
      </Sidebar>
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default NotesWrapper