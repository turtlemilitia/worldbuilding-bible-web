import React, { JSX, useMemo } from 'react'
import {
  useCampaignIndexDataManager,
  useCompendiumIndexDataManager, useSystemIndexDataManager,
} from '@/hooks/DataManagers'
import { getImageForEntity } from '@/utils/dataUtils'
import defaultImage from '../assets/images/city-noir.png'
import { FloatingBox } from '@/components/FloatingBox'
import SmallSansSerifText from '@/components/SmallSansSerifText'
import { Link } from 'react-router-dom'
import useAuthUserDataManager from '@/hooks/DataManagers/useAuthUserDataManager'
import isEmpty from '@/utils/isEmpty'
import { PlusIcon } from 'lucide-react'

export default function Dashboard (): JSX.Element {

  const { user } = useAuthUserDataManager()

  const { campaigns } = useCampaignIndexDataManager()
  const { compendia } = useCompendiumIndexDataManager()
  const { systems } = useSystemIndexDataManager()

  const data = useMemo(() => {

    const canCreateNewSystems = user?.permissions?.some(
      ({ permission, permissionableType }) => {
        return permission === 'create' && permissionableType === 'system'
      })
    const canCreateNewCompendia = user?.permissions?.some(
      ({ permission, permissionableType }) => {
        return permission === 'create' && permissionableType === 'compendium'
      })
    const canCreateNewCampaigns = user?.permissions?.some(
      ({ permission, permissionableType }) => {
        return permission === 'create' && permissionableType === 'campaign'
      })

    const items = []
    if (!isEmpty(campaigns) || canCreateNewCampaigns) {
      items.push({
        label: 'Campaigns',
        entitiesIndex: campaigns,
        entityLink: '/campaigns',
        canCreate: canCreateNewSystems
      })
    }
    if (!isEmpty(compendia) || canCreateNewCompendia) {
      items.push({
        label: 'Compendia',
        entitiesIndex: compendia,
        entityLink: '/compendia',
        canCreate: canCreateNewSystems
      })
    }
    if (!isEmpty(systems) || canCreateNewSystems) {
      items.push({
        label: 'Systems',
        entitiesIndex: systems,
        entityLink: '/systems',
        canCreate: canCreateNewSystems
      })
    }
    return items
  }, [campaigns, compendia, systems, user?.permissions])

  return <div className={'relative w-full h-full  overflow-scroll no-scrollbar flex justify-center py-16 lg:py-32'}>
    <div className={'grid gap-10'}>
      {data.map(({ label, entitiesIndex, entityLink, canCreate }) => {
        return <div>
          <h1
            className={'text-stone-200 text-center text-3xl font-display mb-4'}>{label}</h1>
          <div
            className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4'}>
            {entitiesIndex?.map(entity => {
              const image = useMemo(
                () => getImageForEntity(entity, 'cover')?.thumbnail ??
                  defaultImage, [entity])
              return (
                <Link to={`${entityLink}/${entity.id}/${entity.slug}`}
                      key={entity.id}>
                  <FloatingBox
                    color={'image'}
                    style={{ backgroundImage: `url(${image})` }}
                    className={'relative overflow-hidden text-center h-48 flex items-center justify-center'}
                  >
                    <div
                      className="absolute w-full h-full bg-stone-600 bg-opacity-75 hover:bg-stone-900 hover:bg-opacity-75 transition duration-500"/>
                    <SmallSansSerifText
                      className={'relative'}>{entity.name}</SmallSansSerifText>
                  </FloatingBox>
                </Link>
              )
            })}
            {canCreate && (
              <Link to={`${entityLink}/new`} key={'new'}>
                <FloatingBox
                  color={'glass'}
                  className={'relative overflow-hidden text-center h-48 flex items-center justify-center'}
                >
                  <div className="absolute w-full h-full hover:bg-stone-900 hover:bg-opacity-75 transition duration-500"/>
                  <SmallSansSerifText className={'relative'}>
                    <PlusIcon/>
                  </SmallSansSerifText>
                </FloatingBox>
              </Link>
            )}
          </div>
        </div>
      })}
    </div>
  </div>
}