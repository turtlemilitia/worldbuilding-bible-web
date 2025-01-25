import React, { JSX, useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/hooks'
import { RootState } from '@/store'
import {
  useCampaignIndexDataManager,
  useCompendiumIndexDataManager,
  useSystemIndexDataManager,
  useImageTypeIndexDataManager,
  useGovernmentTypeIndexDataManager,
  useLocationTypeIndexDataManager,
  useQuestTypeIndexDataManager,
  useEncounterTypeIndexDataManager,
} from '../hooks/DataManagers'
import useAuthUserDataManager
  from '../hooks/DataManagers/useAuthUserDataManager'
import LoadingWrapper from '../components/LoadingWrapper'
import { useNoteIndexDataManager } from '@/hooks/DataManagers'
import usePostDataManager from '@/hooks/DataManagers/usePostDataManager'
import useImageIndexDataManager
  from '@/hooks/DataManagers/Images/useImageIndexDataManager'

export const ProtectedRoute = (): JSX.Element => {

  const { token } = useAppSelector((state: RootState) => state.auth)
  const { loading, setLoading, loadingInit } = usePostDataManager()

  const authUserDataManager = useAuthUserDataManager()
  const systemIndexDataManager = useSystemIndexDataManager()
  const compendiumIndexDataManager = useCompendiumIndexDataManager()
  const campaignIndexDataManager = useCampaignIndexDataManager()
  const noteIndexDataManager = useNoteIndexDataManager()
  const imageTypeIndexDataManager = useImageTypeIndexDataManager()
  const governmentTypeIndexDataManager = useGovernmentTypeIndexDataManager()
  const locationTypeIndexDataManager = useLocationTypeIndexDataManager()
  const questTypeIndexDataManager = useQuestTypeIndexDataManager()
  const encounterTypeIndexDataManager = useEncounterTypeIndexDataManager()
  const imageIndexDataManager = useImageIndexDataManager()

  // Here we will be adding the missing items where needed
  useEffect(() => {
    if (token) {
      authUserDataManager.viewOwn({ include: 'favourites;favourites.favouritable;pins;pins.pinnable;characters;permissions' }).
        then((user) => {
          const promises = [
            compendiumIndexDataManager.index(),
            campaignIndexDataManager.index(),
            noteIndexDataManager.index({ include: 'parent:id,slug,name' }),
            imageTypeIndexDataManager.index(),
            governmentTypeIndexDataManager.index(),
            locationTypeIndexDataManager.index(),
            questTypeIndexDataManager.index(),
            encounterTypeIndexDataManager.index(),
            imageIndexDataManager.index(),
          ]
          if (user.canViewSystems) {
            promises.push(systemIndexDataManager.index())
          }
          Promise.all(promises).then(() => {
            setLoading({ init: false })
          })
        })
    }
  }, [token])

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login"/>

  }

  // If authenticated, render the child routes
  return (
    <LoadingWrapper opacity={'100'} loading={loading}
                    loadingText={'Loading...'}>
      {!loadingInit && (
        <Outlet/>
      )}
    </LoadingWrapper>
  )
}