import React, { JSX } from 'react'
import { Dialog } from '@headlessui/react'
import { FloatingBox } from '../FloatingBox'
import { ErrorBanner } from '../Banners/ErrorBanner'
import FormToolbar from '../Forms/FormToolbar'
import { Editor } from '../Forms/Fields/Editor'
import PageTitleField from '../Forms/Fields/PageTitleField'
import InfoBar from '../InfoBar'
import { TPostProps } from '../Post/types'
import { isEmpty } from 'lodash'
import { TGenericPost } from '../../types'

type TProps<T> = TPostProps<T> & {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any
}
const PostDialog = <T extends TGenericPost,>({
  isOpen,
  setIsOpen,
  contentPlaceholder,
  form
}: TProps<T>): JSX.Element => {

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <FloatingBox className={'w-1/2'}>
          <Dialog.Panel>
            <Dialog.Title className={'mb-10'}>
              <PageTitleField value={form.data?.name || ''}
                              onChange={(value) => form.onFieldChange('name', value)}
                              placeholder={'Name'}
                              canEdit={form.isNew || form.canEdit}
              />
            </Dialog.Title>
            <Dialog.Description>
              <div className="flex flex-wrap lg:flex-row-reverse justify-center -mx-3">
                {!isEmpty(form.fields) && (
                  <div className="w-full lg:w-1/4 px-6">
                    <InfoBar
                      loading={false}
                      onChange={form.onFieldChange}
                      data={form.data}
                      fields={form.fields}
                      disabled={!form.canEdit && !form.isNew}
                    />
                  </div>
                )}
                <div className={`w-full md:w-3/4 max-w-2xl px-3 lg:flex-1`}>
                  {Object.keys(form.errors).length > 0 && <ErrorBanner errors={form.errors}/>}
                  {(form.isNew || form.canEdit) && (
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
                    placeholder={contentPlaceholder}
                    canEdit={form.isNew || form.canEdit}
                  />
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
            </Dialog.Description>
          </Dialog.Panel>
        </FloatingBox>
      </div>
    </Dialog>
  )
}

export default PostDialog
