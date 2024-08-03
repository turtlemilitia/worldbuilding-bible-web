import React, { FunctionComponent, JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { TCompendiaWrapperProps } from './types'
import CompendiumSidebar from './CompendiumSidebar'
import { useCompendiumDataManager } from '../../hooks/DataManagers'

const CompendiaWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { compendium, view, removeData } = useCompendiumDataManager()
  const { compendiumId } = useParams() as { compendiumId: string } // router

  const dispatch = useAppDispatch()

  const isNew = (): boolean => compendiumId === 'new'

  useEffect(() => {
    if (!isNew()) {
      view(compendiumId)
    }
    return () => {
      dispatch(removeData(compendiumId))
    }
  }, [])

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

export default CompendiaWrapper