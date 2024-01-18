import React, { FunctionComponent, JSX } from 'react'
import { storeReligion, TReligionRequest, updateReligion, viewReligion } from '../../services/ReligionService'
import {
  clearReligionData,
  setReligionData,
  updateReligionData
} from '../../reducers/compendium/religion/religionSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  updateCompendiumChildData,
} from '../../reducers/compendium/compendiumSlice'
import Post from '../../components/Post/component'
import { TReligion } from '../../types'

const Religion: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { compendiumId, religionId } = useParams() as { compendiumId: string; religionId: string } // router

  const { religion } = useAppSelector((state: RootState) => state.religion) // redux

  const navigate = useNavigate()

  const isNew: boolean = religionId === 'new'
  const readyDataForRequest = (data: any): TReligionRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TReligion> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storeReligion(compendiumId, validated)
        .then(({ data }) => {

          dispatch(addCompendiumChildData({ field: 'religions', data: data.data }))
          navigate(`/compendia/${compendiumId}/religions/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateReligion(religionId, validated)
        .then(({ data }) => {
          dispatch(updateReligionData(data.data))
          dispatch(updateCompendiumChildData({ field: 'religions', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={religionId}
      isNew={isNew}
      remoteData={religion as TReligion}
      onSave={submit}
      onFetch={() => viewReligion(religionId, { include: 'compendium' }).then(({data}) => data.data)}
      fields={[]}
      ready={true}
      resetData={() => dispatch(clearReligionData(undefined))}
      setRemoteData={(data) => dispatch(setReligionData(data))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Religion
