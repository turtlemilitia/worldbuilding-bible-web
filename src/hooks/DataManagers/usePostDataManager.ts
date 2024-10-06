import { postSlice } from '@/reducers/post/postSlice'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { useCallback } from 'react'

const usePostDataManager = () => {

  const slice = postSlice;

  const dispatch = useAppDispatch()

  const { loading, backgroundImage } = useAppSelector(state => state.post)

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

  return {
    loading: Object.values(loading).some(value => Boolean(value)),
    backgroundImage,
    setLoading,
    setBackgroundImage,
    clearBackgroundImage,
  }
}

export default usePostDataManager