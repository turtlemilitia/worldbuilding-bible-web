import React, { JSX, useEffect } from 'react'
import PageTitleField from '../Forms/Fields/PageTitleField'
import EditorsWrapper from './EditorsWrapper'
import FormToolbar from '../Forms/FormToolbar'
import { Editor } from '../Forms/Fields/Editor'
import LoadingWrapper from '../LoadingWrapper'
import { InfoBar } from '../InfoBar'
import { TPostProps } from './types'
import { ErrorBanner } from '../Banners/ErrorBanner'
import SavingDialog from '../SavingDialog'
import { TGenericPost } from '../../types'
import HeaderWrapper from './HeaderWrapper'
import { FloatingBox } from '../FloatingBox'
import CampaignQuickLinks from '../CampaignWrapper/CampaignFavourites'
import RightBar from './RightBar'
import { setBackgroundImage } from '../../reducers/post/postSlice'
import { useAppDispatch } from '../../hooks'

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
const Post = <T extends TGenericPost> ({
  pageTypeName,
  form
}: TPostProps<T>): JSX.Element => {

  const dispatch = useAppDispatch();

  useEffect(() => {

    dispatch(setBackgroundImage(form.imageHandler.getImage('cover')))

  }, [form.imageHandler && form.imageHandler.getImage('cover')])

  return (
    <LoadingWrapper loading={form.loading} opacity={'100'}>
      <SavingDialog saving={form.saving}/>
      <form onSubmit={(e => e.preventDefault())}>
        <HeaderWrapper page={pageTypeName}>
          <PageTitleField value={form.data?.name ?? ''}
                          onChange={(value) => form.onFieldChange('name', value)}
                          placeholder={'Name'}
                          canEdit={form.canEdit}
          />
        </HeaderWrapper>
        <RightBar>
          <CampaignQuickLinks/>
          <InfoBar
            loading={form.loading || !form.fields.length}
            onChange={form.onFieldChange}
            data={form.data}
            fields={form.fields}
            profileImage={form.imageHandler && form.imageHandler.getImage('profile')}
            onProfileImageSelected={form.imageHandler ? (id) => form.imageHandler.handleOnImageSelected(id, 'profile') : undefined}
            canHaveProfileImage={form.imageHandler?.canHaveProfileImage}
            disabled={!form.canEdit}
          />
        </RightBar>
        <EditorsWrapper>
          {Object.keys(form.errors).length > 0 && <ErrorBanner errors={form.errors}/>}
          {(form.canEdit) && (
            <FormToolbar
              canManuallySave={true}
              canRefresh={!form.isNew}
              canDelete={form.canEdit}
              onSave={form.onSave}
              onRefresh={form.onFetch}
              onDelete={form.onDelete}
              onCoverImageSelected={form.imageHandler ? (id) => form.imageHandler.handleOnImageSelected(id, 'cover') : undefined}
            />
          )}
          <FloatingBox>
            <Editor
              id={form.data?.slug ?? 'new'}
              initialValue={form.data?.content}
              onChange={(value) => form.onFieldChange('content', value)}
              canEdit={form.canEdit}
              className={'min-h-40'}
            />
          </FloatingBox>
        </EditorsWrapper>
      </form>
    </LoadingWrapper>
  )

}

export default Post
