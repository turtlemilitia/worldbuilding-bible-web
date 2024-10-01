import React, {JSX, useEffect, useState} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useAppSelector} from '@/hooks'
import {RootState} from '@/store'
import {
    useCampaignIndexDataManager,
    useCompendiumIndexDataManager,
    useNotebookIndexDataManager,
    useSystemIndexDataManager,
    useImageTypeIndexDataManager,
    useGovernmentTypeIndexDataManager,
    useLocationTypeIndexDataManager,
    useQuestTypeIndexDataManager,
    useEncounterTypeIndexDataManager
} from '../hooks/DataManagers'
import useAuthUserDataManager from '../hooks/DataManagers/useAuthUserDataManager'
import LoadingWrapper from "../components/LoadingWrapper";
import { useNoteIndexDataManager } from '@/hooks/DataManagers'

export const ProtectedRoute = (): JSX.Element => {

    const {token} = useAppSelector((state: RootState) => state.auth)
    const [loading, setLoading] = useState<boolean>(true)

    const authUserDataManager = useAuthUserDataManager()
    const systemIndexDataManager = useSystemIndexDataManager()
    const compendiumIndexDataManager = useCompendiumIndexDataManager()
    const campaignIndexDataManager = useCampaignIndexDataManager()
    const notebookIndexDataManager = useNotebookIndexDataManager()
    const noteIndexDataManager = useNoteIndexDataManager()
    const imageTypeIndexDataManager = useImageTypeIndexDataManager()
    const governmentTypeIndexDataManager = useGovernmentTypeIndexDataManager()
    const locationTypeIndexDataManager = useLocationTypeIndexDataManager()
    const questTypeIndexDataManager = useQuestTypeIndexDataManager()
    const encounterTypeIndexDataManager = useEncounterTypeIndexDataManager()

    // Here we will be adding the missing items where needed
    useEffect(() => {
        if (token) {
            const promises = [
                systemIndexDataManager.index(),
                compendiumIndexDataManager.index(),
                campaignIndexDataManager.index(),
                notebookIndexDataManager.index(),
                noteIndexDataManager.index({ include: 'notebook:id,slug,name' }),
                imageTypeIndexDataManager.index(),
                governmentTypeIndexDataManager.index(),
                locationTypeIndexDataManager.index(),
                questTypeIndexDataManager.index(),
                encounterTypeIndexDataManager.index(),
                authUserDataManager.viewOwn({include: 'favourites;favourites.favouritable;pins;pins.pinnable;characters'}) // dont know
            ]
            Promise.all(promises)
                .then(() => {
                    setLoading(false);
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
        <LoadingWrapper opacity={'100'} loading={loading} loadingText={'Loading...'}>
            {!loading && (
              <Outlet/>
            )}
        </LoadingWrapper>
    )
}