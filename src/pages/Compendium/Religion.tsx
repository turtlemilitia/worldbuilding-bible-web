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

const Religion: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, religionId } = useParams() as { compendiumId: string; religionId: string } // router

  const { religion } = useAppSelector((state: RootState) => state.religion) // redux

  const readyDataForRequest = (data: any): TReligionRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={religionId}
      isNew={religionId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/religions/${data.slug}`}
      pathAfterDelete={`/compendia/${compendiumId}`}
      ready={true}

      onFetch={() => viewReligion(religionId).then(({ data }) => data.data)}
      onCreate={(data: TReligionRequest) => storeReligion(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TReligionRequest) => updateReligion(religionId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyReligion(religionId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'religions', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'religions', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'religions', id: religionId }))
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
