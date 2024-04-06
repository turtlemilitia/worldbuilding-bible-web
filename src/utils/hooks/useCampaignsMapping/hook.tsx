import { TUseCampaignsMapping } from './types'
import { useAppDispatch } from '../../../hooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { TEncounter, TQuest, TSession, TTypesAllowed } from '../../../types'
import { removeCampaignChildData } from '../../../reducers/campaign/campaignSlice'
import { SidebarItemInterface } from '../../../components/Sidebar/Sidebar'
import { StarIcon, StickyNoteIcon, SwordsIcon } from 'lucide-react'
import { destroyEncounter } from '../../../services/EncounterService'
import React from 'react'
import { destroyQuest } from '../../../services/QuestService'

const useCampaignsMapping: TUseCampaignsMapping = ({ campaignId }) => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const location = useLocation()

  const prefix = `/campaigns/${campaignId}`

  const onDeleted = (field: string, slug: TTypesAllowed['slug']) => {
    dispatch(removeCampaignChildData({ field, id: slug }))
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
    addNewLinkState: { parent: quest },
    onDelete: () => destroyQuest(quest.slug)
      .then(() => onDeleted('quests', quest.slug)),
    children: quest.children?.map(subQuest => mapQuest(subQuest))
  })

  const mapSession = (session: TSession): SidebarItemInterface => ({
    title: session.name,
    to: `${prefix}/sessions/${session.slug}`,
    icon: (props) => <StickyNoteIcon {...props}/>,
    onDelete: () => destroyQuest(session.slug)
      .then(() => onDeleted('quests', session.slug))
  })

  return {
    mapQuest,
    mapEncounter,
    mapSession
  }
}

export default useCampaignsMapping