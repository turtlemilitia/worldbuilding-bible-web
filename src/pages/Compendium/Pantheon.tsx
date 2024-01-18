import React, { FunctionComponent, JSX } from 'react'
import { storePantheon, TPantheonRequest, updatePantheon, viewPantheon } from '../../services/PantheonService'
import {
  clearPantheonData,
  setPantheonData,
  updatePantheonData
} from '../../reducers/compendium/pantheon/pantheonSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { addCompendiumChildData, updateCompendiumChildData } from '../../reducers/compendium/compendiumSlice'
import { TPantheon } from '../../types'
import Post from '../../components/Post/component'
const Pantheon: FunctionComponent = (): JSX.Element => {

  const { pantheon } = useAppSelector((state: RootState) => state.pantheon) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId, pantheonId } = useParams() as { compendiumId: string; pantheonId: string } // router

  const readyDataForRequest = (data: any): TPantheonRequest => ({
    name: data.name,
    content: data.content,
  })

  return (
    <Post
      key={pantheonId}
      isNew={pantheonId === 'new'}
      pathToNew={(data) => `/compendia/${compendiumId}/pantheons/${data.slug}`}
      ready={true}

      onCreate={(data: TPantheonRequest) => storePantheon(compendiumId, data).then(({ data }) => data.data)}
      onUpdate={(data: TPantheonRequest) => updatePantheon(pantheonId, data).then(({ data }) => data.data)}
      onCreated={(data) => {
        dispatch(addCompendiumChildData({ field: 'pantheons', data: data }))
      }}
      onUpdated={(data) => {
        dispatch(updateCompendiumChildData({ field: 'pantheons', data: data }))
      }}
      onFetch={() => viewPantheon(pantheonId).then(({ data }) => data.data)}
      requestStructureCallback={readyDataForRequest}

      fields={[]}

      persistedData={pantheon as TPantheon}
      setPersistedData={(data) => dispatch(setPantheonData(data))}
      updatePersistedData={(data) => dispatch(updatePantheonData(data))}
      resetPersistedData={() => dispatch(clearPantheonData(undefined))}
    />
  )
}

export default Pantheon
