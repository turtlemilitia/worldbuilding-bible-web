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
  setCompendiumData,
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

  const includes = 'characters;concepts;currencies;deities;factions;items;languages;locations;naturalResources;pantheons;planes;religions;species;spells;stories'

  const { onImageSelected, addImageToSelection } = useImageSelection({
    entityType: 'compendia',
    entityId: compendium?.slug
  })

  const readyDataForRequest = (data: TCompendiumRequest): TCompendiumRequest => ({
    name: data.name,
    content: data.content
  })

  const getImage = useCallback((type: 'cover' | 'profile') => compendium?.images?.find(image => image.pivot?.type.name.toLowerCase() === type)?.original, [compendium?.images])

  const selectImage = async (imageId: number, imageType?: string) => {
    return onImageSelected(imageId, imageType)
      .then((result) => {
        if (result && result.data) {
          const images = addImageToSelection(compendium?.images || [], result.data.data)
          dispatch(updateCompendiumData({ images }))
        }
        return result
      })
  }

  return (
    <Post
      key={compendiumId}
      isNew={compendiumId === 'new'}
      pageTypeName={'Compendium'}
      pathToNew={(data) => `/compendia/${data.slug}`}
      pathAfterDelete={`/`}
      canEdit={compendium && compendium.canUpdate}
      canDelete={compendium && compendium.canDelete}
      ready={true}

      onFetch={() => viewCompendium(compendiumId, { include: includes }).then(({data}) => data.data)}
      onCreate={(data: TCompendiumRequest) => storeCompendium(readyDataForRequest(data)).then(({ data }) => data.data)}
      onUpdate={(data: TCompendiumRequest) => updateCompendium(compendiumId, readyDataForRequest(data)).then(({ data }) => data.data)}
      onDelete={() => destroyCompendium(compendiumId)}
      onCreated={(data) => {
        dispatch(addCompendium(data))
      }}

      fields={[]}

      persistedData={compendium as TCompendium}
      setPersistedData={(data) => dispatch(setCompendiumData(data))}
      updatePersistedData={(data) => dispatch(updateCompendiumData(data))}
      resetPersistedData={() => {}}

      onImageSelected={selectImage}
      coverImageUrl={getImage('cover')}
    />
  )
}

export default Compendium
