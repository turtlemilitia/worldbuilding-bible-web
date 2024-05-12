import React, { FunctionComponent, JSX } from 'react'
import {
  destroyPantheon,
  storePantheon,
  TPantheonRequest,
  updatePantheon,
  viewPantheon
} from '../../services/PantheonService'
import {
  clearPantheonData,
  setPantheonData,
  updatePantheonData
} from '../../reducers/compendium/pantheon/pantheonSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import {
  addCompendiumChildData,
  removeCompendiumChildData,
  updateCompendiumChildData
} from '../../reducers/compendium/compendiumSlice'
import { TPantheon } from '../../types'
import Post from '../../components/Post'
import useUrlFormatter from '../../hooks/useUrlFormatter'
const Pantheon: FunctionComponent = (): JSX.Element => {

  const { pantheon } = useAppSelector((state: RootState) => state.pantheon) // redux

  const dispatch = useAppDispatch() // redux

  const navigate = useNavigate();

  const { compendiumId, pantheonId } = useParams() as { compendiumId: string; pantheonId: string } // router

  const {compendiumPath} = useUrlFormatter()

  const readyDataForRequest = (data: any): TPantheonRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={pantheonId}
      isNew={pantheonId === 'new'}
      pageTypeName={'Pantheon'}
      canEdit={pantheon.canUpdate}
      canDelete={pantheon.canDelete}
      ready={true}

      onFetch={() => viewPantheon(pantheonId).then(({ data }) => data.data)}
      onCreate={(data: TPantheonRequest) => storePantheon(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TPantheonRequest) => updatePantheon(pantheonId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyPantheon(pantheonId)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'pantheons', data: data }))
        navigate(`${compendiumPath}/pantheons/${data.slug}`)
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'pantheons', data: data }))
      }}
      onDeleted={() => {
        dispatch(removeCompendiumChildData({ field: 'pantheons', id: pantheonId }))
        navigate(compendiumPath)
      }}

      fields={[]}

      persistedData={pantheon as TPantheon}
      setPersistedData={(data) => dispatch(setPantheonData(data))}
      updatePersistedData={(data) => dispatch(updatePantheonData(data))}
      resetPersistedData={() => dispatch(clearPantheonData(undefined))}
    />
  )
}

export default Pantheon
