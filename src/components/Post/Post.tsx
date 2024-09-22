import React, {JSX, useEffect, useState} from 'react'
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
import usePostDataManager from '../../hooks/DataManagers/usePostDataManager'
import ProfileImagePicker from "../ProfileImagePicker";

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

  const { setBackgroundImage } = usePostDataManager();

  const [profileImagePickerOpen, setProfileImagePickerOpen] = useState<boolean>(false)

  useEffect(() => {

    setBackgroundImage(form.imageHandler.getImage('cover'))

  }, [form.imageHandler.getImage('cover')])

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
            openProfileImagePicker={() => setProfileImagePickerOpen(true)}
            canHaveProfileImage={form.imageHandler.canHaveProfileImage}
            disabled={!form.canEdit}
          />
        </RightBar>
        <EditorsWrapper>
          {Object.keys(form.errors).length > 0 && <ErrorBanner errors={form.errors}/>}
          <FormToolbar
            canEdit={form.canEdit}
            canManuallySave={true}
            canRefresh={!form.isNew}
            canDelete={form.canEdit}
            onSave={form.onSave}
            onRefresh={form.onFetch}
            onDelete={form.onDelete}
            pinHandler={form.pinHandler}
            favouriteHandler={form.favouriteHandler}
            playerCharacterHandler={form.playerCharacterHandler}
            permissionHandler={form.permissionHandler}
            onCoverImageSelected={(id) => form.imageHandler.handleOnImageSelected(id, 'cover')}
          />
          <FloatingBox color={'solid'}>
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
      <ProfileImagePicker open={profileImagePickerOpen} onClose={() => setProfileImagePickerOpen(false)} onProfileImageSelected={(id) => form.imageHandler.handleOnImageSelected(id, 'profile')}/>
    </LoadingWrapper>
  )

}

export default Post
