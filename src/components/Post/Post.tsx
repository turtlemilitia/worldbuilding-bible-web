import React, {JSX, useEffect, useState} from 'react'
import PageTitleField from '../Forms/Fields/PageTitleField'
import EditorsWrapper from './EditorsWrapper'
import FormToolbar from '../Forms/FormToolbar'
import { Editor } from '../Forms/Fields/Editor'
import { InfoBar } from '../InfoBar'
import { TPostProps } from './types'
import { ErrorBanner } from '../Banners/ErrorBanner'
import SavingDialog from '../SavingDialog'
import { TGenericPost } from '@/types'
import HeaderWrapper from './HeaderWrapper'
import { FloatingBox } from '../FloatingBox'
import CampaignQuickLinks from '../CampaignWrapper/CampaignFavourites'
import RightBar from './RightBar'
import usePostDataManager from '../../hooks/DataManagers/usePostDataManager'
import ProfileImagePicker from "../ProfileImagePicker";

// todo
//  <TopMenu>
//  <CampaignMenu> -> in wrapper
//  <WrapMenu> -> left sidebar -> in wrapper
//    - [ ] Compendium -> all, Campaign -> Quests, Sessions, Encounters
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

  const { setBackgroundImage, clearBackgroundImage, setLoading } = usePostDataManager();

  const [profileImagePickerOpen, setProfileImagePickerOpen] = useState<boolean>(false)

  useEffect(() => {

    setBackgroundImage(form.imageHandler.getImage('cover'))

    return () => clearBackgroundImage()

  }, [form.imageHandler.getImage('cover')])

  useEffect(() => {
    setLoading({ post: form.loading })
  }, [form.loading])

  return (
    <>
      <SavingDialog saving={form.saving}/>
      <form onSubmit={(e => e.preventDefault())}
            className={'h-full w-full xl:w-3/4 xl:ml-auto lg:flex'}
      >
        <div className={'w-full lg:w-1/2 h-full py-10 overflow-scroll no-scrollbar'}>
          <HeaderWrapper page={pageTypeName}>
            <PageTitleField value={form.data?.name ?? ''}
                            onChange={(value) => form.onFieldChange('name', value)}
                            placeholder={'Name'}
                            canEdit={form.canEdit}
            />
          </HeaderWrapper>
          <EditorsWrapper>
            {Object.keys(form.errors).length > 0 && <ErrorBanner errors={form.errors}/>}
            <FormToolbar
              canEdit={form.canEdit}
              canManuallySave={true}
              canRefresh={!form.isNew}
              canDelete={form.canEdit && !form.isNew}
              onSave={form.onSave}
              onRefresh={form.onFetch}
              onDelete={form.onDelete}
              pinHandler={form.pinHandler}
              favouriteHandler={form.favouriteHandler}
              playerCharacterHandler={form.playerCharacterHandler}
              permissionHandler={form.permissionHandler}
              onCoverImageSelected={!form.isNew ? (id) => form.imageHandler.handleOnImageSelected(id, 'cover') : undefined}
            />
            {!form.loading && (
              <FloatingBox color={'solid'} border={'yellow'}>
                <Editor
                  key={form.data?.id}
                  initialValue={form.data?.content ?? ''}
                  onChange={(value) => form.onFieldChange('content', value)}
                  canEdit={form.canEdit}
                  className={'min-h-40'}
                />
              </FloatingBox>
            )}
          </EditorsWrapper>
        </div>
        <RightBar>
          <CampaignQuickLinks/>
          <InfoBar
            key={form.data?.id}
            loading={form.loading || !form.fields.length}
            onChange={form.onFieldChange}
            data={form.data}
            fields={form.fields}
            profileImage={form.imageHandler && form.imageHandler.getImage('profile')}
            openProfileImagePicker={() => setProfileImagePickerOpen(true)}
            canHaveProfileImage={form.imageHandler.canHaveProfileImage}
            disabled={!form.canEdit}
            showSubPosts={true}
          />
        </RightBar>
      </form>
      <ProfileImagePicker open={profileImagePickerOpen} onClose={() => setProfileImagePickerOpen(false)} onProfileImageSelected={(id) => form.imageHandler.handleOnImageSelected(id, 'profile')}/>
    </>
  )

}

export default Post
