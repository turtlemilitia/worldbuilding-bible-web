import React, { FunctionComponent, JSX, useCallback } from 'react'
import { TCompendium } from '../../types'
import { storeCompendium, TCompendiumRequest, updateCompendium, viewCompendium } from '../../services/CompendiumService'
import {
  clearCompendiumData,
  setCompendiumLoading,
  updateCompendiumData
} from '../../reducers/compendium/compendiumSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { addCompendium } from '../../reducers/compendium/compendiaIndexSlice'
import Post from '../../components/Post/component'
import useImageSelection from '../../utils/hooks/useImageSelection'

const Compendium: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId } = useParams() as { compendiumId: string } // router

  const navigate = useNavigate()

  const { onImageSelected, addImageToSelection } = useImageSelection({
    entityType: 'compendia',
    entityId: compendium.slug
  })

  const isNew: boolean = compendiumId === 'new'

  const submit = (data: any): Promise<TCompendium> => {
    if (isNew) {
      return storeCompendium(data)
        .then(({ data }) => {
          dispatch(updateCompendiumData(data.data))
          dispatch(addCompendium(data.data))
          navigate(`/compendia/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateCompendium(compendiumId, data)
        .then(({ data }) => {
          dispatch(updateCompendiumData(data.data))
          return data.data
        })
    }
  }

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
      isNew={isNew}
      remoteData={compendium as TCompendium}
      onSave={submit}
      onFetch={onPostFetch}
      ready={true}
      fields={[]}
      resetData={() => {}}
      onImageSelected={selectImage}
      setRemoteData={(data) => dispatch(updateCompendiumData(data))}
      coverImageUrl={coverImage()}
      requestStructureCallback={readyDataForRequest}
    />
  )
}

export default Compendium
