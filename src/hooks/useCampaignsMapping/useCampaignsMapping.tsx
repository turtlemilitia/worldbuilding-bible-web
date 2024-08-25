import { TUseCampaignsMapping } from './types'
import { useLocation, useNavigate } from 'react-router-dom'
import { TEncounter, TQuest, TScene, TSession, TTypesAllowed } from '../../types'
import { SidebarItemInterface } from '../../components/Sidebar/Sidebar'
import { StarIcon, StickyNoteIcon, SwordsIcon, VenetianMaskIcon } from 'lucide-react'
import React, { useCallback, useMemo } from 'react'
import {
  useEncounterDataManager,
  useQuestDataManager, useSceneDataManager,
  useSessionDataManager
} from '../DataManagers'

const useCampaignsMapping: TUseCampaignsMapping = ({ campaignId }) => {

  const navigate = useNavigate()

  const location = useLocation()

  const { destroy: destroyEncounter } = useEncounterDataManager()
  const { destroy: destroyQuest } = useQuestDataManager()
  const { destroy: destroySession } = useSessionDataManager()
  const { destroy: destroyScene } = useSceneDataManager()

  const prefix = useMemo(() => `/campaigns/${campaignId}`, [campaignId])

  const onDeleted = useCallback((field: string, slug: TTypesAllowed['slug']) => {
    if (location.pathname.includes(`${prefix}/${field}/${slug}`)) {
      navigate(`${prefix}`)
    }
  }, [location.pathname, prefix, navigate])

  const mapEncounter = useCallback((encounter: TEncounter): SidebarItemInterface => ({
    title: encounter.name,
    to: `${prefix}/encounters/${encounter.slug}`,
    icon: (props) => <SwordsIcon {...props}/>,
    onDelete: () => destroyEncounter(encounter.slug)
      .then(() => onDeleted('encounters', encounter.slug))
  }), [prefix, destroyEncounter, onDeleted])

  const mapQuest = useCallback((quest: TQuest): SidebarItemInterface => ({
    title: quest.name,
    to: `${prefix}/quests/${quest.slug}`,
    icon: (props) => <StarIcon {...props}/>,
    addNewLink: `${prefix}/quests/new`,
    addNewLinkState: { type: quest.type.id, parent: quest.id },
    onDelete: () => destroyQuest(quest.slug)
      .then(() => onDeleted('quests', quest.slug)),
    children: quest.children?.map(subQuest => mapQuest(subQuest))
  }), [prefix, destroyQuest, onDeleted])

  const mapSession = useCallback((session: TSession): SidebarItemInterface => ({
    title: session.name,
    to: `${prefix}/sessions/${session.slug}`,
    icon: (props) => <StickyNoteIcon {...props}/>,
    onDelete: () => destroySession(session.slug)
      .then(() => onDeleted('sessions', session.slug))
  }), [prefix, destroySession, onDeleted])

  const mapScene = useCallback((scene: TScene): SidebarItemInterface => ({
    title: scene.name,
    to: `${prefix}/scenes/${scene.slug}`,
    icon: (props) => <VenetianMaskIcon {...props}/>,
    onDelete: () => destroyScene(scene.slug)
      .then(() => onDeleted('scenes', scene.slug))
  }), [prefix, destroyScene, onDeleted])

  return {
    mapQuest,
    mapEncounter,
    mapSession,
    mapScene
  }
}

export default useCampaignsMapping