import React, { JSX, useMemo } from 'react'
import {
  useCampaignIndexDataManager,
  useCompendiumIndexDataManager,
} from '@/hooks/DataManagers'
import { getImageForEntity } from '@/utils/dataUtils'
import defaultImage from '../assets/images/city-noir.png'
import { FloatingBox } from '@/components/FloatingBox'
import SmallSansSerifText from '@/components/SmallSansSerifText'
import { Link } from 'react-router-dom'

export default function Dashboard (): JSX.Element {
  const { campaigns } = useCampaignIndexDataManager()
  const { compendia } = useCompendiumIndexDataManager()

  const data = [
    {
      label: 'Campaigns',
      entitiesIndex: campaigns,
      entityLink: '/campaigns',
    },
    {
      label: 'Compendia',
      entitiesIndex: compendia,
      entityLink: '/compendia',
    },
  ]

  return <div className={'min-h-screen flex items-center justify-center'}>
    <div className={'grid gap-10'}>
      {data.map(({ label, entitiesIndex, entityLink }) => {
        return <div>
          <h1
            className={'text-stone-200 text-center text-3xl font-display mb-4'}>{label}</h1>
          <div
            className={'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-4'}>
            {entitiesIndex?.map(entity => {
              const image = useMemo(() => getImageForEntity(entity, 'cover')?.thumbnail ??
                  defaultImage, [entity])
              return (
                <Link to={`${entityLink}/${entity.id}/${entity.slug}`}
                      key={entity.id}>
                  <FloatingBox
                    key={entity.id}
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
          </div>
        </div>
      })}
    </div>
  </div>
}