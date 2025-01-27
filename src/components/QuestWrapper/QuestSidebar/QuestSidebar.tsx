import React, { FunctionComponent, useMemo, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import { TQuestSidebarProps } from './types'
import { MapPinIcon } from 'lucide-react'
import { Button } from '@/components/Forms/Fields/Button'
import { isPinned } from '@/utils/pinUtils'
import { IsPublic } from '@/utils/publicUtils'
import useFilterByPinned from '@/components/Sidebar/useFilterByPinned'
import useFilterByPublic from '@/components/Sidebar/useFilterByPublic'
import QuestsByLocation from '@/components/QuestWrapper/QuestSidebar/QuestsByLocation'
import QuestsByType from '@/components/QuestWrapper/QuestSidebar/QuestsByType'

const QuestSidebar: FunctionComponent<TQuestSidebarProps> = React.memo(
  ({ campaign }) => {

    const [orderBy, setOrderBy] = useState<'location' | null>(null)

    const addNewLink = `/campaigns/${campaign.slug}/quests/new`

    const {publicOnly, PublicOnlyButton} = useFilterByPublic();
    const {pinnedOnly, PinnedOnlyButton} = useFilterByPinned();

    const quests = useMemo(() => {
      let quests = campaign.quests;
      if (!quests) {
        return [];
      }
      if (pinnedOnly) {
        quests = quests.filter(quest => isPinned(
          { campaign, entityName: 'quest', entityId: quest.id }))
      }
      if (publicOnly) {
        quests = quests.filter(quest => IsPublic(
          { campaign, entityName: 'quest', entityId: quest.id }))
      }
      return quests
    }, [pinnedOnly, publicOnly, campaign])


    const filters = []
    if (campaign.canUpdate) {
      filters.push(
        <Button
          size={'icon'}
          variant={orderBy === 'location' ? 'primary' : 'ghost'}
          className={'block text-stone-300 text-center content-center'}
          onClick={() => setOrderBy(
            prevState => prevState !== 'location' ? 'location' : null)}
        >
          <MapPinIcon className="w-5 h-5 inline-block"/>
        </Button>,
        <PinnedOnlyButton/>,
        <PublicOnlyButton/>,
      )
    }

    return <Sidebar
      title={'Quests'}
      addNew={addNewLink}
      canAdd={campaign.canUpdate}
      filters={filters}
    >
      {orderBy === 'location' ? (
        <QuestsByLocation
          campaign={campaign}
          addNewLink={addNewLink}
          quests={quests}/>
      ) : (
        <QuestsByType
          campaign={campaign}
          addNewLink={addNewLink}
          quests={quests}/>
      )}
    </Sidebar>
  })

export default QuestSidebar