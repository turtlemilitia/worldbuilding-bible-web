import React, { FunctionComponent, JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { TCompendiaWrapperProps } from './types'
import CompendiumSidebar from './CompendiumSidebar'
import { useCompendiumDataManager } from '../../hooks/DataManagers'

const CompendiumWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { compendium, view, clearData } = useCompendiumDataManager()
  const { compendiumId } = useParams() as { compendiumId: string } // router

  useEffect(() => {
    if (compendiumId !== 'new') {
      view(compendiumId, { include: 'characters;concepts;currencies;deities;factions;items;languages;locations;locations.parent;naturalResources;pantheons;planes;religions;species;spells;stories' })
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
        <Outlet/>
      </div>
    </>
  )
}

export default CompendiumWrapper