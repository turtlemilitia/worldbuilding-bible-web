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
import { TGenericPost } from '../../types'

// todo
//  <TopMenu>
//  <CampaignMenu> -> in wrapper
//  <WrapMenu> -> left sidebar -> in wrapper
//    - Compendium -> all, Campaign -> Quests, Sessions, Encounters
//  <Main Body>
//    - [ ] <Title>
//      - [ ] <Slug>
//    - [ ] <Map>
//    - [ ] <BackgroundImage> -> createContext
//    - [ ] <Contents> // multiple
//  <CampaignQuickLinks> -> right sidebar top (QuickLinks) -> in wrapper
//    - [ ] <CurrentLocation>
//    - [ ] <CurrentQuest>
//    - [ ] <MyCharacter>
//    - [ ] <SearchButton>
//    - [ ] <FavouritesButton>
//  <InfoBar>
//    - [ ] <ProfileImage>
//    - [ ] <Fields>
const Post = <T extends TGenericPost>({
  pageTypeName,
  form
}: TPostProps<T>): JSX.Element => {

  return (
    <LoadingWrapper loading={form.loading} opacity={'100'}>
      <SavingDialog saving={form.saving}/>
      <form onSubmit={(e => e.preventDefault())}>
        <HeaderWrapper
          page={pageTypeName}
          onCoverImageSelected={form.imageHandler ? (id) => form.imageHandler.handleOnImageSelected(id, 'cover') : undefined}
          coverImage={form.imageHandler && form.imageHandler.getImage('cover')}
        >
          <PageTitleField value={form.data?.name ?? ''}
                          onChange={(value) => form.onFieldChange('name', value)}
                          placeholder={'Name'}
                          canEdit={form.canEdit}
          />
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-between -mx-3">
            <div className="w-full lg:w-1/4 px-6">
              <InfoBar
                loading={form.loading}
                onChange={form.onFieldChange}
                data={form.data}
                fields={form.fields}
                profileImage={form.imageHandler && form.imageHandler.getImage('profile')}
                onProfileImageSelected={form.imageHandler ? (id) => form.imageHandler.handleOnImageSelected(id, 'profile'): undefined}
                canHaveProfileImage={form.imageHandler?.canHaveProfileImage}
                disabled={!form.canEdit}
              />
            </div>
            <div className="w-full md:w-2/4 max-w-2xl px-3 lg:flex-1">
              {Object.keys(form.errors).length > 0 && <ErrorBanner errors={form.errors}/>}
              {(form.canEdit) && (
                <FormToolbar
                  canManuallySave={true}
                  canRefresh={!form.isNew}
                  canDelete={form.canEdit}
                  onSave={form.onSave}
                  onRefresh={form.onFetch}
                  onDelete={form.onDelete}
                />
              )}
              <Editor
                id={form.data?.slug ?? 'new'}
                initialValue={form.data?.content}
                onChange={(value) => form.onFieldChange('content', value)}
                canEdit={form.canEdit}
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
