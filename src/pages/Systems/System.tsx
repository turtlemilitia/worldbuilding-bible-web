import React, { JSX, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearSystemData, setSystemData, updateSystemData } from '../../reducers/system/systemSlice'
import { Save } from 'lucide-react'
import DiscreetH1Field from '../../components/Forms/SpyFields/DiscreetH1Field'
import DiscreetTextareaField from '../../components/Forms/SpyFields/DiscreetTextareaField'
import HeaderWrapper from '../../components/HeaderWrapper'
import ContentWrapper from '../../components/ContentWrapper'
import { storeSystem, updateSystem, viewSystem } from '../../services/SystemService'
import { TSystem } from '../../types'
import { AxiosError } from 'axios'
import LoadingSpinner from '../../components/LoadingSpinner'
import LoadingWrapper from '../../components/LoadingWrapper'
import { addSystem } from '../../reducers/system/systemsIndexSlice'

const System = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { slug } = useParams() as { slug: string } // router

  const navigate = useNavigate();

  const initialState: TSystem = {
    name: '',
    content: ''
  };

  const remote = useAppSelector((state: RootState) => state.system) // redux

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TSystem>(initialState)
  const [error, setError] = useState<string>()

  const isNew: boolean = slug === 'new'

  useEffect(() => {
    if (slug && !isNew) {
      setLoading(true);
      viewSystem(slug)
        .then(response => {
          setLoading(false);
          setData(response.data.data)
          dispatch(setSystemData(response.data.data))
        })
        .catch(err => {
          setError(err)
        })
    }
    if (isNew) {
      setData(initialState);
      dispatch(clearSystemData(undefined));
    }
    return () => {
      dispatch(clearSystemData(undefined));
    }
  }, [slug])

  const submit = (event: React.SyntheticEvent) => {
    setLoading(true);
    if (isNew) {
      storeSystem(data)
        .then(response => {
          setLoading(false);
          setData(response.data.data)
          dispatch(setSystemData(response.data.data))
          dispatch(addSystem(response.data.data))
          navigate(`/systems/${response.data.data.slug}`)
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateSystem(slug, data)
        .then(response => {
          setLoading(false);
          setData(response.data.data)
          dispatch(updateSystemData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    }

    event.preventDefault()
  }

  return (
    <LoadingWrapper loading={loading}>
      <form onSubmit={submit}>
        <HeaderWrapper page="System">
          <DiscreetH1Field value={data.name}
                           onChange={(value) => setData((prevState: TSystem) => ({ ...prevState, name: value }))}
                           placeholder={'System Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper errorText={error}>
          <div className="flex justify-end px-3 py-2">
            <button type="submit">
              <Save className="stroke-stone-700 h-5 w-5"/>
            </button>
          </div>
          <DiscreetTextareaField
            value={data.content}
            onChange={(value) => setData((prevState: TSystem) => ({ ...prevState, content: value }))}
            placeholder={'Write a simple description for the system.'}
          />
        </ContentWrapper>
      </form>
    </LoadingWrapper>
  )
}

export default System