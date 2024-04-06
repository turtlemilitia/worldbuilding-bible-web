import React, { createContext, FunctionComponent, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { RootState } from '../../store'
import EncounterSidebar from './EncounterSidebar'
import { TEncounterType } from '../../types'
import { indexEncounterTypes } from '../../services/EncounterTypeService'

export const EncounterWrapperContext = createContext<TEncounterType[]|undefined>(undefined)
const EncounterWrapper: FunctionComponent = () => {

  const { campaign } = useAppSelector((state: RootState) => state.campaign) // redux

  const { encounterId } = useParams();
  const navigate = useNavigate();

  const [types, setTypes] = useState<TEncounterType[]>()

  useEffect(() => {

    if (!campaign?.slug || encounterId) {
      return;
    }
    if (campaign.encounters?.length > 1) {
      navigate(`/campaigns/${campaign.slug}/encounters/${campaign.encounters[0]?.slug}`)
    } else {
      navigate(`/campaigns/${campaign.slug}/encounters/new`)
    }

  }, [campaign?.slug])

  useEffect(() => {
    indexEncounterTypes().then(response => setTypes(response.data.data))
  }, [])

  return (
    <EncounterWrapperContext.Provider value={types}>
      {campaign && types && (
        <EncounterSidebar campaign={campaign}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </EncounterWrapperContext.Provider>
  )
}

export default EncounterWrapper