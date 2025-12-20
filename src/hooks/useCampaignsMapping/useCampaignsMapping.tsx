import { useLocation, useNavigate } from 'react-router-dom'
import {
  TCampaign,
  TEncounter,
  TQuest,
  TScene,
  TSession,
  TTypesAllowed,
} from '@/types'
import { SidebarItemInterface } from '@/components/Sidebar/Sidebar'
import { StarIcon, StickyNoteIcon, SwordsIcon, VenetianMaskIcon } from 'lucide-react'
import React, { useCallback, useMemo } from 'react'
import {
  useEncounterDataManager,
  useQuestDataManager, useSceneDataManager,
  useSessionDataManager
} from '../DataManagers'
import { makeLink } from '@/hooks/useLink'
import useUrlFormatter from '@/hooks/useUrlFormatter'

type TProps = {
  campaignId: TCampaign['id']
}
const useCampaignsMapping = ({ campaignId }: TProps) => {

  const navigate = useNavigate()

  const location = useLocation()

  const { destroy: destroyEncounter } = useEncounterDataManager(campaignId)
  const { destroy: destroyQuest } = useQuestDataManager(campaignId)
  const { destroy: destroySession } = useSessionDataManager(campaignId)
  const { destroy: destroyScene } = useSceneDataManager(campaignId)

  const { campaignPath: prefix } = useUrlFormatter()

  const onDeleted = useCallback((field: string, id: TTypesAllowed['id']) => {
    if (location.pathname.includes(`${prefix}/${field}/${id}`)) {
      navigate(`${prefix}`)
    }
  }, [location.pathname, prefix, navigate])

  const mapEncounter = useCallback((encounter: TEncounter): SidebarItemInterface => ({
    title: encounter.name,
    done: Boolean(encounter.completedAt),
    to: makeLink('encounters', encounter.id, encounter.slug, '', prefix),
    icon: (props) => <SwordsIcon {...props}/>,
    onDelete: encounter.canDelete ? () => destroyEncounter(encounter.id)
      .then(() => onDeleted('encounters', encounter.id)) : undefined
  }), [prefix, destroyEncounter, onDeleted])

  const mapQuest = useCallback((quest: TQuest): SidebarItemInterface => ({
    title: quest.name,
    done: Boolean(quest.completedAt),
    to: makeLink('quests', quest.id, quest.slug, '', prefix),
    icon: (props) => <StarIcon {...props}/>,
    addNewLink: quest.canUpdate ? `${prefix}/quests/new` : '',
    addNewLinkState: { type: quest.type.id, parent: quest.id },
    onDelete: quest.canDelete ? () => destroyQuest(quest.id)
      .then(() => onDeleted('quests', quest.id)) : undefined,
    children: quest.children?.map(subQuest => mapQuest(subQuest))
  }), [prefix, destroyQuest, onDeleted])

  const mapSession = useCallback((session: TSession): SidebarItemInterface => ({
    title: `${session.session_number} | ${session.name}`,
    to: makeLink('sessions', session.session_number, session.slug, '', prefix),
    icon: (props) => <StickyNoteIcon {...props}/>,
    onDelete: session.canDelete ? () => destroySession(session.id)
      .then(() => onDeleted('sessions', session.id)) : undefined
  }), [prefix, destroySession, onDeleted])

  const mapScene = useCallback((scene: TScene): SidebarItemInterface => ({
    title: scene.name,
    done: Boolean(scene.completedAt),
    to: makeLink('scenes', scene.id, scene.slug, '', prefix),
    icon: (props) => <VenetianMaskIcon {...props}/>,
    onDelete: scene.canDelete ? () => destroyScene(scene.id)
      .then(() => onDeleted('scenes', scene.id)) : undefined
  }), [prefix, destroyScene, onDeleted])

  return {
    mapQuest,
    mapEncounter,
    mapSession,
    mapScene
  }
}

export default useCampaignsMapping