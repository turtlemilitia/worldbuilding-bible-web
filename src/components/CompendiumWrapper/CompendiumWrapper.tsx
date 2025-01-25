import React, { FunctionComponent, JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { TCompendiaWrapperProps } from './types'
import CompendiumSidebar from './CompendiumSidebar'
import { useCompendiumDataManager } from '../../hooks/DataManagers'
import { compendiumIncludes } from '@/hooks/Forms/useCompendiumForm/useCompendiumForm'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'
import { fixId } from '@/utils/dataUtils'

const CompendiumWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { compendiumId } = useParams() as { compendiumId: string }
  const { setLoading } = usePostDataManager()
  const id = fixId(compendiumId);
  const { compendium, view } = useCompendiumDataManager(id)
  const {setDefaultBackgroundImage, clearDefaultBackgroundImage} = usePostDataManager()

  useEffect(() => {
    if (
      id && (!compendium || compendium?.id !== id) // if it's been loaded as part of the campaign
    ) {
      setLoading({ [id]: true })
      view(id, { include: `${compendiumIncludes};images` })
        .then(() => setLoading({ [id]: false }))
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
      <div className="relative w-full">
        {(id || compendium) && (
          <Outlet/>
        )}
      </div>
    </>
  )
}

export default CompendiumWrapper