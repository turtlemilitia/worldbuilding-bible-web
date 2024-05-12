import React, { FunctionComponent, JSX } from 'react'
import {
  destroyReligion,
  storeReligion,
  TReligionRequest,
  updateReligion,
  viewReligion
} from '../../services/ReligionService'
import {
  clearReligionData,
  setReligionData,
  updateReligionData
} from '../../reducers/compendium/religion/religionSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData, removeCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post'
import { TReligion } from '../../types'
import useUrlFormatter from '../../hooks/useUrlFormatter'

const Religion: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate();

  const { compendiumId, religionId } = useParams() as { compendiumId: string; religionId: string } // router

  const { religion } = useAppSelector((state: RootState) => state.religion) // redux

  const {compendiumPath} = useUrlFormatter()

  const readyDataForRequest = (data: any): TReligionRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={religionId}
      isNew={religionId === 'new'}
      pageTypeName={'Religion'}
      canEdit={religion.canUpdate}
      canDelete={religion.canDelete}
      ready={true}

      onFetch={() => viewReligion(religionId).then(({ data }) => data.data)}
      onCreate={(data: TReligionRequest) => storeReligion(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TReligionRequest) => updateReligion(religionId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyReligion(religionId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'religions', data: data }))
        navigate(`${compendiumPath}/religions/${data.slug}`)
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'religions', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'religions', id: religionId }))
        navigate(compendiumPath)
      }}

      fields={[]}

      persistedData={religion as TReligion}
      setPersistedData={(data) => dispatch(setReligionData(data))}
      updatePersistedData={(data) => dispatch(updateReligionData(data))}
      resetPersistedData={() => dispatch(clearReligionData(undefined))}
    />
  )
}

export default Religion
