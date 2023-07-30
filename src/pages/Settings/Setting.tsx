import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import DiscreetH1Field from '../../components/Forms/SpyFields/DiscreetH1Field'
import { TSetting } from '../../types'
import ContentWrapper from '../../components/ContentWrapper'
import { Save } from 'lucide-react'
import DiscreetTextareaField from '../../components/Forms/SpyFields/DiscreetTextareaField'
import { storeSetting, updateSetting, viewSetting } from '../../services/SettingService'
import { clearSettingData, setSettingData, updateSettingData } from '../../reducers/setting/settingSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'

const Setting: FunctionComponent = (): JSX.Element => {

  const dispatch = useAppDispatch() // redux

  const { slug } = useParams() as { slug: string } // router

  const remote = useAppSelector((state: RootState) => state.setting) // redux

  const initialState = {
    name: '',
    description: ''
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>()
  const [data, setData] = useState<TSetting>(initialState)

  const isNew: boolean = slug === 'new'

  const fetch = (): void => {
    setLoading(true);
    viewSetting(slug)
      .then(response => {
        setLoading(false);
        setData(response.data.data)
        dispatch(setSettingData(response.data.data))
      })
      .catch(err => {
        setError(err)
      })
  }

  useEffect(() => {
    if (slug && !isNew) {
      fetch();
    }
    if (isNew) {
      setData(initialState);
      dispatch(clearSettingData(undefined));
    }
    return () => {
      dispatch(clearSettingData(undefined));
    }
  }, [slug])

  const submit = (event: React.SyntheticEvent) => {
    setLoading(true);
    if (isNew) {
      storeSetting(data)
        .then(response => {
          setLoading(false);
          setData(response.data.data)
          dispatch(setSettingData(response.data.data))
        })
        .catch((err: AxiosError) => {
          setError(err.message)
        })
    } else {
      updateSetting(slug, data)
        .then(response => {
          setLoading(false);
          setData(response.data.data)
          dispatch(updateSettingData(response.data.data))
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
        <HeaderWrapper>
          <DiscreetH1Field value={data.name}
                           onChange={(value) => setData((prevState: TSetting) => ({ ...prevState, name: value }))}
                           placeholder={'Setting Name Here'}/>
        </HeaderWrapper>
        <ContentWrapper errorText={error}>
          <FormToolbar onSave={submit} onRefresh={fetch}/>
          <DiscreetTextareaField
            value={data.description}
            onChange={(value) => setData((prevState: TSetting) => ({ ...prevState, description: value }))}
            placeholder={'Write a simple description for the setting.'}
          />
        </ContentWrapper>
      </form>
    </LoadingWrapper>
  )
}

export default Setting;