import React, {JSX} from 'react'
import { HeaderWrapper } from '../HeaderWrapper'
import PageTitleField from '../Forms/Fields/PageTitleField'
import ContentWrapper from '../ContentWrapper'
import FormToolbar from '../Forms/FormToolbar'
import { Editor } from '../Forms/Fields/Editor'
import LoadingWrapper from '../LoadingWrapper'
import { InfoBar } from '../InfoBar'
import { TPostProps } from './types'
import { ErrorBanner } from '../Banners/ErrorBanner'
import SavingDialog from '../SavingDialog'

const Post = <T,>({
  pageTypeName,
  contentPlaceholder,
  form,
  fields,
  imageHandler,
  isNew = true,
  canEdit = false,
}: TPostProps<T>): JSX.Element => {

  return (
    <LoadingWrapper loading={form.loading || (!!fields && !fields.ready)} opacity={'100'}>
      <SavingDialog saving={form.saving}/>
      <form onSubmit={(e => e.preventDefault())}>
        <HeaderWrapper
          page={pageTypeName}
          onCoverImageSelected={imageHandler ? (id) => imageHandler.handleOnImageSelected(id, 'cover') : undefined}
          coverImage={imageHandler && imageHandler.getImage('cover')}
        >
          <PageTitleField value={form.newData?.name ?? ''}
                          onChange={(value) => form.onFieldChange('name', value)}
                          placeholder={'Name'}
                          canEdit={canEdit}
          />
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-between -mx-3">
            <div className="w-full lg:w-1/4 px-6">
              <InfoBar
                loading={form.loading}
                onChange={form.onFieldChange}
                data={form.newData}
                fields={fields?.fields}
                profileImage={imageHandler && imageHandler.getImage('profile')}
                onProfileImageSelected={imageHandler ? (id) => imageHandler.handleOnImageSelected(id, 'profile'): undefined}
                disabled={!canEdit}
              />
            </div>
            <div className="w-full md:w-2/4 max-w-2xl px-3 lg:flex-1">
              {Object.keys(form.errors).length > 0 && <ErrorBanner errors={form.errors}/>}
              {(canEdit) && (
                <FormToolbar
                  canManuallySave={true}
                  canRefresh={!isNew}
                  canDelete={canEdit}
                  onSave={form.onSave}
                  onRefresh={form.onFetch}
                  onDelete={form.onDelete}
                />
              )}
              <Editor
                id={form.newData?.slug ?? 'new'}
                initialValue={form.newData?.content}
                onChange={(value) => form.onFieldChange('content', value)}
                placeholder={contentPlaceholder}
                canEdit={isNew || canEdit}
                className={'min-h-screen'}
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
