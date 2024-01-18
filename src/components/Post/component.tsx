import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react'
import { HeaderWrapper } from '../HeaderWrapper'
import PageTitleField from '../Forms/Fields/PageTitleField'
import ContentWrapper from '../ContentWrapper'
import FormToolbar from '../Forms/FormToolbar'
import { Editor } from '../Forms/Fields/Editor'
import LoadingWrapper from '../LoadingWrapper'
import { InfoBar } from '../InfoBar'
import { TPostProps } from './types'
import { ErrorBanner } from '../Banners/ErrorBanner'
import { TTypesAllowed } from '../../types'
import { debounce } from 'lodash'
import useErrorHandling from '../../utils/hooks/useErrorHandling'
import useFormHandling from '../../utils/hooks/useFormHandling'

const Post: FunctionComponent<TPostProps<TTypesAllowed>> = (props) => {

  const {
    isNew,
    ready,
    pageTypeName,
    contentPlaceholder,
    fields,
    onSave,
    onFetch,
    remoteData,
    setRemoteData,
    resetData,
    onImageSelected,
    coverImageUrl,
    requestStructureCallback,
  } = props

  const { errors, data, loading, handleChange, fetchData, handleOnSave } = useFormHandling({
    isNew,
    onFetch,
    onSave,
    persistedData: remoteData,
    setPersistedData: setRemoteData,
    resetPersistedData: resetData,
    requestStructureCallback
  })

  return (
    <LoadingWrapper loading={loading || !ready}>
      <form onSubmit={(e => e.preventDefault())}>
        <HeaderWrapper
          page={pageTypeName}
          onCoverImageSelected={onImageSelected ? (id) => onImageSelected(id, 'cover') : undefined}
          coverImage={coverImageUrl}
        >
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
              <FormToolbar canManuallySave={isNew} onSave={handleOnSave} onRefresh={fetchData}/>
              <Editor
                initialValue={data.content}
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