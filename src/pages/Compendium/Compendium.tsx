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
  setCompendiumLoading,
  updateCompendiumData
} from '../../reducers/compendium/compendiumSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { addCompendium } from '../../reducers/compendium/compendiaIndexSlice'
import Post from '../../components/Post'
import useImageSelection from '../../utils/hooks/useImageSelection'
import { motion } from 'framer-motion'

const Compendium: FunctionComponent = (): JSX.Element => {

  const { compendium, loading } = useAppSelector((state: RootState) => state.compendium) // redux

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

  const onPostFetch = useCallback(async (): Promise<TCompendium> => {
    // If loading, wait until loading is finished and compendium is present
    if (loading) {
      return new Promise(resolve => {
        const checkInterval = setInterval(() => {
          // Check if loading is done and compendium is present
          if (!loading && compendium) {
            clearInterval(checkInterval);
            resolve(compendium);
          }
        }, 100); // Check every 100ms
      });
    }

    // If compendium is not present, trigger loading
    if (!compendium) {
      // Indicate that it's loading to avoid duplicate loading attempts
      dispatch(setCompendiumLoading(true));
      // Fetch the compendium
      return viewCompendium(compendiumId, { include: includes }).then(({ data }) => {
        dispatch(setCompendiumLoading(false)); // Loading finished
        return data.data; // Return the loaded compendium data
      });
    }

    // If compendium is already loaded, return it directly
    return compendium;
  }, [dispatch, loading, compendium])

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
        if (compendium?.id && compendium.id !== data.id) {
          dispatch(setCompendiumData(data))
        } else {
          dispatch(updateCompendiumData(data))
        }
      }}
      updatePersistedData={(data) => dispatch(updateCompendiumData(data))}
      resetPersistedData={() => {}}

      onImageSelected={selectImage}
      coverImageUrl={getImage('cover')}
    />
  )
}

export default Compendium
