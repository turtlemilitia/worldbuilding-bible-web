import React, { FunctionComponent, JSX, useCallback } from 'react'
import { TCompendium } from '../../types'
import { storeCompendium, updateCompendium, viewCompendium } from '../../services/CompendiumService'
import { updateCompendiumData } from '../../reducers/compendium/compendiumSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { addCompendium } from '../../reducers/compendium/compendiaIndexSlice'
import Post from '../../components/Post/component'
import useImageSelection from '../../utils/useImageSelection'

const Compendium: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId } = useParams() as { compendiumId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = !compendium?.slug;

  const reset = () => {};

  const fetch = async () => {}

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
          return data.data;
        })
    }
  }

  const coverImage = useCallback(() => compendium.images?.find(image => image.pivot?.type.name.toLowerCase() === 'cover')?.original, [compendium.images]);

  const { onImageSelected, addImageToSelection } = useImageSelection({ entityType: 'compendia', entityId: compendium.slug })

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
      initialValues={compendium as TCompendium}
      onSubmit={submit}
      onFetch={fetch}
      ready={true}
      fields={[]}
      resetData={reset}
      onImageSelected={selectImage}
      coverImageUrl={coverImage()}
    />
  )
}

export default Compendium
