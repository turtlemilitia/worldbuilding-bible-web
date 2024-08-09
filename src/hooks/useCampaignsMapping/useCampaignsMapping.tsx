import { TUseCampaignsMapping } from './types'
import { useAppDispatch } from '../../hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { TEncounter, TQuest, TSession, TTypesAllowed } from '../../types'
import { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import { StarIcon, StickyNoteIcon, SwordsIcon } from 'lucide-react'
import React from 'react'
import {
  useCampaignDataManager,
  useEncounterDataManager,
  useQuestDataManager,
  useSessionDataManager
} from '../DataManagers'

const useCampaignsMapping: TUseCampaignsMapping = ({ campaignId }) => {

  const navigate = useNavigate()

  const location = useLocation()

  const { destroy: destroyEncounter } = useEncounterDataManager()
  const { destroy: destroyQuest } = useQuestDataManager()
  const { destroy: destroySession } = useSessionDataManager()

  const prefix = `/campaigns/${campaignId}`

  const onDeleted = (field: string, slug: TTypesAllowed['slug']) => {
    if (location.pathname.includes(`${prefix}/${field}/${slug}`)) {
      navigate(`${prefix}`)
    }
  }

  const mapEncounter = (encounter: TEncounter): SidebarItemInterface => ({
    title: encounter.name,
    to: `${prefix}/encounters/${encounter.slug}`,
    icon: (props) => <SwordsIcon {...props}/>,
    onDelete: () => destroyEncounter(encounter.slug)
      .then(() => onDeleted('encounters', encounter.slug))
  })

  const mapQuest = (quest: TQuest): SidebarItemInterface => ({
    title: quest.name,
    to: `${prefix}/quests/${quest.slug}`,
    icon: (props) => <StarIcon {...props}/>,
    addNewLink: `${prefix}/quests/new`,
    addNewLinkState: { type: quest.type.id, parent: quest.id },
    onDelete: () => destroyQuest(quest.slug)
      .then(() => onDeleted('quests', quest.slug)),
    children: quest.children?.map(subQuest => mapQuest(subQuest))
  })

  const mapSession = (session: TSession): SidebarItemInterface => ({
    title: session.name,
    to: `${prefix}/sessions/${session.slug}`,
    icon: (props) => <StickyNoteIcon {...props}/>,
    onDelete: () => destroySession(session.slug)
      .then(() => onDeleted('sessions', session.slug))
  })

  return {
    mapQuest,
    mapEncounter,
    mapSession
  }
}

export default useCampaignsMapping