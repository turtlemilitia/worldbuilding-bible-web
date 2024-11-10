import React, { FunctionComponent, JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { TCompendiaWrapperProps } from './types'
import CompendiumSidebar from './CompendiumSidebar'
import { useCompendiumDataManager } from '../../hooks/DataManagers'
import { compendiumIncludes } from '@/hooks/Forms/useCompendiumForm/useCompendiumForm'
import { useCampaignDataManager } from '@/hooks/DataManagers'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'

const CompendiumWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { setLoading } = usePostDataManager()
  const { campaign } = useCampaignDataManager()
  const { compendium, view, clearData } = useCompendiumDataManager()
  const {setDefaultBackgroundImage, clearDefaultBackgroundImage} = usePostDataManager()
  const { compendiumId } = useParams() as { compendiumId: string } // router

  useEffect(() => {
    if (
      compendiumId !== 'new'
      && (!compendium || compendium?.slug !== compendiumId) // if it's been loaded as part of the campaign
    ) {
      setLoading({ [compendiumId]: true })
      view(compendiumId, { include: `${compendiumIncludes};images` }).
        then(() => setLoading({ [compendiumId]: false }))
    }
    return () => {
      if (!campaign) {
        clearData(compendiumId)
      }
    }
  }, [compendiumId])


  useEffect(() => {

    const coverImage = compendium?.images?.find(image => image.pivot?.type?.name.toLowerCase() === 'cover')?.original
    setDefaultBackgroundImage(coverImage)

    return () => clearDefaultBackgroundImage()

  }, [compendium])

  return (
    <>
      {compendium && (
        <CompendiumSidebar compendium={compendium}/>
      )}
      <div className="relative w-full">
        {(compendiumId === 'new' || compendium) && (
          <Outlet/>
        )}
      </div>
    </>
  )
}

export default CompendiumWrapper