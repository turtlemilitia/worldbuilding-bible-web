import React, { FunctionComponent } from 'react'
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
import useFormHandling from '../../utils/hooks/useFormHandling'
import SavingDialog from '../SavingDialog'

const Post: FunctionComponent<TPostProps<TTypesAllowed>> = (props) => {

  const {
    isNew,
    ready,
    pageTypeName,
    contentPlaceholder,
    fields,
    allowProfileImage = false,
    onImageSelected,
    coverImageUrl,
    profileImageUrl,
  } = props

  const {
    errors,
    newData,
    fetchedData,
    loading,
    saving,
    handleOnFieldChange,
    handleOnFetch,
    handleOnSave,
    handleOnDelete,
  } = useFormHandling({ ...props })

  return (
    <LoadingWrapper loading={loading || !ready} opacity={'90'}>
      <SavingDialog saving={saving}/>
      <form onSubmit={(e => e.preventDefault())}>
        <HeaderWrapper
          page={pageTypeName}
          onCoverImageSelected={onImageSelected ? (id) => onImageSelected(id, 'cover') : undefined}
          coverImage={coverImageUrl}
        >
          <PageTitleField value={newData.name}
                          onChange={(value) => handleOnFieldChange('name', value)}
                          placeholder={'Name'}/>
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-between -mx-3">
            <div className="w-full lg:w-1/4 px-6">
              <InfoBar
                loading={loading}
                onChange={handleOnFieldChange}
                data={newData}
                fields={fields}
                profileImage={profileImageUrl}
                onProfileImageSelected={allowProfileImage && onImageSelected ? (id) => onImageSelected(id, 'profile') : undefined}/>
            </div>
            <div className="w-full md:w-2/4 max-w-2xl px-3 lg:flex-1">
              {Object.keys(errors).length > 0 && <ErrorBanner errors={errors}/>}
              <FormToolbar
                canManuallySave={true}
                canDelete={!isNew}
                onSave={handleOnSave}
                onRefresh={handleOnFetch}
                onDelete={handleOnDelete}
              />
              <Editor
                initialValue={fetchedData.content}
                onChange={(value) => handleOnFieldChange('content', value)}
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