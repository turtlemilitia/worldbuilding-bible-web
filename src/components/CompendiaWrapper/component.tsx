import React, { FunctionComponent, JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  clearCompendiumData, updateCompendiumData
} from '../../reducers/compendium/compendiumSlice'
import { TCompendiaWrapperProps } from './types'
import { RootState } from '../../store'
import { viewCompendium } from '../../services/CompendiumService'
import CompendiumSidebar from './CompendiumSidebar'

const CompendiaWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { compendiumId } = useParams() as { compendiumId: string } // router

  const dispatch = useAppDispatch()

  const includes = 'characters;concepts;currencies;deities;factions;items;languages;locations;naturalResources;pantheons;planes;religions;species;spells;stories'

  const isNew = (): boolean => compendiumId === 'new'

  useEffect(() => {
    if (!isNew()) {
      viewCompendium(compendiumId, { include: includes })
        .then(({ data }) => {
          dispatch(updateCompendiumData(data.data))
        })
    }
    return () => {
      dispatch(clearCompendiumData(undefined))
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