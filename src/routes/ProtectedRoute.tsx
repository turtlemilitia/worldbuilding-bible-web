import { JSX, useEffect } from 'react'
import {Navigate, Outlet} from "react-router-dom";
import { useAppSelector } from '../hooks'
import { RootState } from '../store'
import {
    useCampaignIndexDataManager,
    useCompendiumIndexDataManager,
    useNotebookIndexDataManager,
    useSystemIndexDataManager,
    useImageTypeIndexDataManager,
    useGovernmentTypeIndexDataManager,
    useLocationTypeIndexDataManager, useQuestTypeIndexDataManager, useEncounterTypeIndexDataManager
} from '../hooks/DataManagers'

export const ProtectedRoute = (): JSX.Element => {
    const {token} = useAppSelector((state: RootState) => state.auth) // redux

    const systemIndexDataManager = useSystemIndexDataManager()
    const compendiumIndexDataManager = useCompendiumIndexDataManager()
    const campaignIndexDataManager = useCampaignIndexDataManager()
    const notebookIndexDataManager = useNotebookIndexDataManager()
    const imageTypeIndexDataManager = useImageTypeIndexDataManager()
    const governmentTypeIndexDataManager = useGovernmentTypeIndexDataManager()
    const locationTypeIndexDataManager = useLocationTypeIndexDataManager()
    const questTypeIndexDataManager = useQuestTypeIndexDataManager()
    const encounterTypeIndexDataManager = useEncounterTypeIndexDataManager()


    // Here we will be adding the missing items where needed
    useEffect(() => {
        if (token) {
            // Fetch the systems data from the API
            systemIndexDataManager.index()
            compendiumIndexDataManager.index()
            campaignIndexDataManager.index()
            notebookIndexDataManager.index({include: 'notes'})
            imageTypeIndexDataManager.index()
            governmentTypeIndexDataManager.index()
            locationTypeIndexDataManager.index()
            questTypeIndexDataManager.index()
            encounterTypeIndexDataManager.index()

            // todo get user data
        }
    }, [token]);

    // Check if the user is authenticated
    if (!token) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/login"/>

    }

    // If authenticated, render the child routes
    return <Outlet/>;
}