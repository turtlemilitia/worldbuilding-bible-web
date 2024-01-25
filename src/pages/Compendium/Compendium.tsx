import React, { FunctionComponent, JSX, useCallback } from 'react'
import { TCompendium } from '../../types'
import {
  destroyCompendium,
  storeCompendium,
  TCompendiumRequest,
  updateCompendium,
  viewCompendium
} from '../../services/CompendiumService'
import {
  clearCompendiumData,
  setCompendiumData,
  setCompendiumLoading,
  updateCompendiumData
} from '../../reducers/compendium/compendiumSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { addCompendium } from '../../reducers/compendium/compendiaIndexSlice'
import Post from '../../components/Post'
import useImageSelection from '../../utils/hooks/useImageSelection'

const Compendium: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId } = useParams() as { compendiumId: string } // router

  const { onImageSelected, addImageToSelection } = useImageSelection({
    entityType: 'compendia',
    entityId: compendium.slug
  })

  const readyDataForRequest = (data: TCompendium): TCompendiumRequest => ({
    name: data.name,
    content: data.content
  })

  const coverImage = useCallback(() => compendium.images?.find(image => image.pivot?.type.name.toLowerCase() === 'cover')?.original, [compendium.images])

  const onPostFetch = useCallback(() => {
    // we tell it it's loading so we avoid loading it twice when CompendiaWrapper loads
    dispatch(setCompendiumLoading(true))
    return viewCompendium(compendiumId, { include: 'images' }).then(({ data }) => {
      dispatch(setCompendiumLoading(false))
      return data.data
    })
  }, [dispatch])

  const selectImage = async (imageId: number, imageType?: string) => {
    return onImageSelected(imageId, imageType)
      .then((result) => {
        if (result && result.data) {
          const images = addImageToSelection(compendium.images || [], result.data.data)
          dispatch(updateCompendiumData({ images }))
        }
        return result
      })
  }

  return (
    <Post
      key={compendiumId}
      isNew={compendiumId === 'new'}
      pathToNew={(data) => `/compendia/${data.slug}`}
      pathAfterDelete={`/`}
      ready={true}

      onFetch={onPostFetch}
      onCreate={(data: TCompendiumRequest) => storeCompendium(readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TCompendiumRequest) => updateCompendium(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyCompendium(compendiumId)}
      onCreated={(data) => {
        dispatch(addCompendium(data))
      }}

      fields={[]}

      persistedData={compendium as TCompendium}
      setPersistedData={(data) => {
        if (compendium.id && compendium.id !== data.id) {
          dispatch(setCompendiumData(data))
        } else {
          dispatch(updateCompendiumData(data))
        }
      }}
      updatePersistedData={(data) => dispatch(updateCompendiumData(data))}
      resetPersistedData={() => {}}

      onImageSelected={selectImage}
      coverImageUrl={coverImage()}
    />
  )
}

export default Compendium
