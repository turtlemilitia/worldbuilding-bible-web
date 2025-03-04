import React, { JSX, useEffect, useState } from 'react'
import { Button, Dialog } from '@headlessui/react'
import { FloatingBox } from '../FloatingBox'
import { ErrorBanner } from '../Banners/ErrorBanner'
import FormToolbar from '../Forms/FormToolbar'
import { Editor } from '../Forms/Fields/Editor'
import PageTitleField from '../Forms/Fields/PageTitleField'
import { InfoBar } from '../InfoBar'
import { TPostProps } from '../Post/types'
import { isEmpty } from 'lodash'
import { TGenericPost } from '@/types'
import { XIcon } from 'lucide-react'
import LoadingWrapper from '../LoadingWrapper'
import EditorsWrapper from '@/components/Post/EditorsWrapper'
import { clsx } from 'clsx'

type TProps<T> = TPostProps<T> & {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any,
}
const PostDialog = <T extends TGenericPost, > ({
  isOpen,
  setIsOpen,
  contentPlaceholder,
  form,
}: TProps<T>): JSX.Element => {

  const [backgroundImage, setBackgroundImage] = useState<string>()

  const [profileImagePickerOpen, setProfileImagePickerOpen] = useState<boolean>(
    false)

  useEffect(() => {

    setBackgroundImage(form.imageHandler.getImage('cover'))

  }, [form.imageHandler.getImage('cover')])

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-10">
        <FloatingBox color={'dark'}
                     className={'w-full 2xl:w-3/4 h-full max-h-full bg-cover bg-center p-0 overflow-hidden'}
                     style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', }}>
          <Button className={'absolute top-5 right-5 z-10 cursor-pointer'} onClick={() => setIsOpen(false)}>
            <XIcon className={'h-6 w-6'}/>
          </Button>
          <LoadingWrapper loading={form.loading} opacity={'100'} positioning={'absolute'}>
            {!form.loading && (
              <Dialog.Panel className={clsx(
                'h-full w-full xl:mx-auto lg:flex',
                backgroundImage ? 'bg-black bg-opacity-50' : ''
              )}>
                <div className={`w-full lg:w-1/2 h-full py-12 overflow-scroll no-scrollbar`}>
                  <Dialog.Title className={'w-full py-10 px-6 mb-4'}>
                    <PageTitleField value={form.data?.name || ''}
                                    onChange={(value) => form.onFieldChange(
                                      'name', value)}
                                    placeholder={'Name'}
                                    canEdit={form.canEdit}
                    />
                  </Dialog.Title>
                  <Dialog.Description>
                    <EditorsWrapper>
                      {Object.keys(form.errors).length > 0 && (
                        <ErrorBanner errors={form.errors}/>
                      )}
                      {(form.canEdit) && (
                        <FormToolbar
                          canEdit={form.canEdit}
                          canManuallySave={true}
                          canRefresh={!form.isNew}
                          canDelete={false/*form.canEdit && !form.isNew*/}// todo allow delete later
                          onSave={form.onSave}
                          onRefresh={form.onFetch}
                          onDelete={form.onDelete}
                          pinHandler={form.pinHandler}
                          favouriteHandler={form.favouriteHandler}
                          playerCharacterHandler={form.playerCharacterHandler}
                          permissionHandler={form.permissionHandler}
                          onCoverImageSelected={!form.isNew
                            ? (id) => form.imageHandler.handleOnImageSelected(
                              id, 'cover')
                            : undefined}
                          link={!form.isNew ? form.link : ''}
                        />
                      )}
                      <FloatingBox color={'solid'} border={'yellow'}>
                        <Editor
                          key={form.data?.id}
                          initialValue={form.data?.content ?? ''}
                          onChange={(value) => form.onFieldChange('content',
                            value)}
                          placeholder={contentPlaceholder}
                          canEdit={form.canEdit}
                          className={'min-h-40'}
                        />
                      </FloatingBox>
                    </EditorsWrapper>
                  </Dialog.Description>
                </div>
                <div className="w-full lg:w-1/2 h-full py-12 px-6 overflow-scroll no-scrollbar">
                  {!isEmpty(form.fields) && (
                    <InfoBar
                      key={form.data?.id}
                      loading={form.loading || !form.fields.length}
                      onChange={form.onFieldChange}
                      data={form.data}
                      fields={form.fields}
                      profileImage={form.imageHandler && form.imageHandler.getImage('profile')}
                      openProfileImagePicker={() => setProfileImagePickerOpen(true)}
                      canHaveProfileImage={!form.isNew && form.imageHandler.canHaveProfileImage}
                      disabled={!form.canEdit}
                      showSubPosts={true}
                    />
                  )}
                </div>
              </Dialog.Panel>
            )}
          </LoadingWrapper>
        </FloatingBox>
      </div>
    </Dialog>
  )
}

export default PostDialog
