import React, { FunctionComponent, JSX } from 'react'
import { storePantheon, TPantheonRequest, updatePantheon, viewPantheon } from '../../services/PantheonService'
import {
  clearPantheonData,
  setPantheonData,
  updatePantheonData
} from '../../reducers/compendium/pantheon/pantheonSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { addCompendiumChildData, updateCompendiumChildData } from '../../reducers/compendium/compendiumSlice'
import { TPantheon } from '../../types'
import Post from '../../components/Post/component'
import { TFields } from '../../components/InfoBar'

const Pantheon: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux
  const { pantheon } = useAppSelector((state: RootState) => state.pantheon) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, pantheonId } = useParams() as { compendiumId: string; pantheonId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = pantheonId === 'new'

  const readyDataForRequest = (data: any): TPantheonRequest => ({
    name: data.name,
    content: data.content,
  })

  const submit = (data: any): Promise<TPantheon> => {
    const validated = readyDataForRequest(data)
    if (isNew) {
      return storePantheon(compendiumId, validated)
        .then(({ data }) => {
          dispatch(setPantheonData(data.data))
          dispatch(addCompendiumChildData({ field: 'pantheons', data: data.data }))
          navigate(`/compendia/${compendiumId}/pantheons/${data.data.slug}`)
          return data.data
        })
    } else {
      return updatePantheon(pantheonId, validated)
        .then(({ data }) => {
          dispatch(updatePantheonData(data.data))
          dispatch(updateCompendiumChildData({ field: 'pantheons', data: data.data }))
          return data.data
        })
    }
  }

  return (
    <Post
      key={pantheonId}
      isNew={isNew}
      ready={true}
      remoteData={pantheon as TPantheon}
      onSave={submit}
      onFetch={() => viewPantheon(pantheonId, { include: 'compendium' }).then(({data}) => data.data)}
      fields={[]}
      resetData={() => dispatch(clearPantheonData(undefined))}
      setRemoteData={(data) => dispatch(setPantheonData(data))}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Pantheon
