import React, { FunctionComponent, JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  clearCompendiumData, setCompendiumData
} from '../../reducers/compendium/compendiumSlice'
import { TCompendiaWrapperProps } from './types'
import { RootState } from '../../store'
import { viewCompendium } from '../../services/CompendiumService'
import CompendiumSidebar from './CompendiumSidebar'

const CompendiaWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { compendium, loading } = useAppSelector((state: RootState) => state.compendium) // redux
  const { compendiumId } = useParams() as { compendiumId: string } // router

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!loading && compendiumId !== 'new') {
      viewCompendium(compendiumId, { include: 'images' })
        .then(({ data }) => {
          dispatch(setCompendiumData(data.data))
        })
    }
    return () => { // todo is this the right place?
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