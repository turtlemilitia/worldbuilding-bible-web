import React, { JSX, useEffect, useState } from 'react'
import { Button, Dialog } from '@headlessui/react'
import { FloatingBox } from '../FloatingBox'
import { ErrorBanner } from '../Banners/ErrorBanner'
import FormToolbar from '../Forms/FormToolbar'
import { Editor } from '../Forms/Fields/Editor'
import PageTitleField from '../Forms/Fields/PageTitleField'
import InfoBar from '../InfoBar'
import { TPostProps } from '../Post/types'
import { isEmpty } from 'lodash'
import { TGenericPost } from '@/types'
import { XIcon } from 'lucide-react'
import LoadingWrapper from '../LoadingWrapper'

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

  useEffect(() => {

    setBackgroundImage(form.imageHandler.getImage('cover'))

  }, [form.imageHandler.getImage('cover')])

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <FloatingBox color={'dark'} className={'w-full lg:w-2/3 min-h-64 max-h-full max-w-6xl p-12 bg-cover bg-center'} style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none', }}>
          <LoadingWrapper loading={form.loading} opacity={'100'} positioning={'absolute'}>
            {!form.loading && (
              <Dialog.Panel>
                <Dialog.Title className={'w-full px-6 mb-4'}>
                  <FloatingBox>
                    <Button className={'absolute top-5 right-5'}
                            onClick={() => setIsOpen(false)}><XIcon/></Button>
                    <PageTitleField value={form.data?.name || ''}
                                    onChange={(value) => form.onFieldChange('name', value)}
                                    placeholder={'Name'}
                                    canEdit={form.canEdit}
                    />
                  </FloatingBox>
                </Dialog.Title>
                <Dialog.Description className="flex flex-wrap lg:flex-row-reverse justify-center">
                  {!isEmpty(form.fields) && (
                    <div className="w-full md:w-96 px-6">
                      <InfoBar
                        loading={form.loading || !form.fields.length}
                        onChange={form.onFieldChange}
                        data={form.data}
                        fields={form.fields}
                        disabled={!form.canEdit}
                      />
                    </div>
                  )}
                  <div className={`w-full md:w-3/4 px-6 lg:flex-1`}>
                    {Object.keys(form.errors).length > 0 && <ErrorBanner errors={form.errors}/>}
                    {(form.canEdit) && (
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
                        link={!form.isNew ? form.link : ''}
                      />
                    )}
                    <FloatingBox color={'solid'} className={'max-h-[calc(100vh/2)] overflow-scroll'}>
                      <Editor
                        id={form.data?.slug ?? 'new'}
                        initialValue={form.data?.content}
                        onChange={(value) => form.onFieldChange('content', value)}
                        placeholder={contentPlaceholder}
                        canEdit={form.canEdit}
                      />
                    </FloatingBox>
                  </div>
                </Dialog.Description>
              </Dialog.Panel>
            )}
          </LoadingWrapper>
        </FloatingBox>
      </div>
    </Dialog>
  )
}

export default PostDialog
