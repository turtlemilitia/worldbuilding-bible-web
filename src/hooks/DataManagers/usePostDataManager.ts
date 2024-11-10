import { postSlice } from '@/reducers/post/postSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useCallback } from 'react'

const usePostDataManager = () => {

  const slice = postSlice;

  const dispatch = useAppDispatch()

  const { loading, backgroundImage, defaultBackgroundImage } = useAppSelector(state => state.post)

  // REDUX MANAGEMENT
  const setLoading = useCallback((loading: { [id: string]: boolean }) => {
    dispatch(slice.actions.setLoading(loading))
  }, [])

  const setBackgroundImage = useCallback((backgroundImage: string|undefined) => {
    dispatch(slice.actions.setBackgroundImage(backgroundImage))
  }, [])

  const clearBackgroundImage = useCallback(() => {
    dispatch(slice.actions.setBackgroundImage(undefined))
  }, [])

  const setDefaultBackgroundImage = useCallback((backgroundImage: string|undefined) => {
    dispatch(slice.actions.setDefaultBackgroundImage(backgroundImage))
  }, [])

  const clearDefaultBackgroundImage = useCallback(() => {
    dispatch(slice.actions.setDefaultBackgroundImage(undefined))
  }, [])

  return {
    loading: Object.values(loading).some(value => Boolean(value)),
    backgroundImage,
    defaultBackgroundImage,
    setLoading,
    setBackgroundImage,
    clearBackgroundImage,
    setDefaultBackgroundImage,
    clearDefaultBackgroundImage,
  }
}

export default usePostDataManager