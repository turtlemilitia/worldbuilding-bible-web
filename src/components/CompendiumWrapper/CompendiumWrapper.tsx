import React, { FunctionComponent, JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { TCompendiaWrapperProps } from './types'
import CompendiumSidebar from './CompendiumSidebar'
import { useCompendiumDataManager } from '../../hooks/DataManagers'
import { compendiumIncludes } from '@/hooks/Forms/useCompendiumForm/useCompendiumForm'

const CompendiumWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { compendium, view, clearData } = useCompendiumDataManager()
  const { compendiumId } = useParams() as { compendiumId: string } // router

  useEffect(() => {
    if (compendiumId !== 'new') {
      view(compendiumId, { include: compendiumIncludes })
    }
    return () => {
      clearData(compendiumId)
    }
  }, [compendiumId])

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