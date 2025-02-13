import React, { FunctionComponent, JSX, useEffect, useMemo } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { TCompendiaWrapperProps } from './types'
import CompendiumSidebar from './CompendiumSidebar'
import { useCompendiumDataManager } from '../../hooks/DataManagers'
import { compendiumIncludes } from '@/hooks/Forms/useCompendiumForm/useCompendiumForm'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'
import { fixId } from '@/utils/dataUtils'

const CompendiumWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { compendiumId } = useParams() as { compendiumId: string }
  const { setLoading, isLoading, isLoaded } = usePostDataManager()
  const id = useMemo(() => fixId(compendiumId), [compendiumId]);
  const { compendium, view } = useCompendiumDataManager(id)
  const {setDefaultBackgroundImage, clearDefaultBackgroundImage} = usePostDataManager()

  useEffect(() => {
    if (id && !isLoading(`compendium:${id}`) && !isLoaded(`compendium:${id}`)) { // if it's been loaded as part of the campaign
      setLoading({ [`compendium:${id}`]: true })
      view(id, { include: `${compendiumIncludes};images` })
        .then(() => setLoading({ [`compendium:${id}`]: false }))
    }
  }, [id])


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
      <>
        {(id || compendium) && (
          <Outlet/>
        )}
      </>
    </>
  )
}

export default CompendiumWrapper