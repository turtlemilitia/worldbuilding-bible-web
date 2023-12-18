import React, { FunctionComponent, useEffect, useState } from 'react'
import HeaderWrapper from '../HeaderWrapper'
import PageTitleField from '../Forms/Fields/PageTitleField'
import ContentWrapper from '../ContentWrapper'
import FormToolbar from '../Forms/FormToolbar'
import { Editor } from '../Forms/Fields/Editor'
import LoadingWrapper from '../LoadingWrapper'
import { InfoBar } from '../InfoBar'
import { TPostProps } from './types'
import { ErrorBanner } from '../Banners/ErrorBanner'
import { TTypesAllowed } from '../../types'

const Post: FunctionComponent<TPostProps<TTypesAllowed>> = (props) => {

  const {
    ready,
    pageTypeName,
    contentPlaceholder,
    fields,
    onSubmit,
    onFetch,
    initialValues,
    resetData
  } = props

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<TTypesAllowed>(initialValues)
  const [errors, setErrors] = useState({})

  useEffect(() => {

    handleRefresh()

    return () => resetData()

  }, [])

  useEffect(() => {

    setData(initialValues)

  }, [initialValues])

  const handleChange = (name: string, value: string) => setData((prevState) => ({...prevState, [name]: value}));

  const handleRefresh = () => {
    setLoading(true);
    setErrors({});
    onFetch()
      .then(() => {
        setLoading(false)
      })
      .catch((err: any) => {
        setLoading(false);
        if (err && err.message) {
          setErrors(err.message)
        }
      });
  }

  const handleOnSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});
    // TODO handle validation
    onSubmit && onSubmit(data)
      .then(data => {
        setLoading(false);
        setData(data)
      })
      .catch((err: any) => {
        setLoading(false);
        if (err && err.message) {
          if (err.response?.data?.errors) {
            setErrors(err.response?.data?.errors)
          } else {
            setErrors({ error: err.message })
          }
        } else {
          setErrors({ error: 'The was an error in the request.'});
        }
      });
  }

  return (
    <LoadingWrapper loading={loading || !ready}>
      <form onSubmit={handleOnSubmit}>
        <HeaderWrapper page={pageTypeName}>
          <PageTitleField value={data.name}
                          onChange={(value) => handleChange('name', value)}
                          placeholder={'Name'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-between -mx-3">
            <div className="w-full lg:w-1/4 px-6">
              <InfoBar
                loading={loading}
                onChange={handleChange}
                data={data}
                fields={fields}/>
            </div>
            <div className="w-full md:w-2/4 max-w-2xl px-3 lg:flex-1">
              {Object.keys(errors).length > 0 && <ErrorBanner errors={errors}/>}
              <FormToolbar onSave={handleOnSubmit} onRefresh={handleRefresh}/>
              <Editor
                initialValue={initialValues.content}
                onChange={(value) => handleChange('content', value)}
                placeholder={contentPlaceholder}
              />
            </div>
            <div className="flex lg:w-1/4 lg:px-6"></div>
          </div>
        </ContentWrapper>
      </form>
    </LoadingWrapper>
  )

}

export default Post