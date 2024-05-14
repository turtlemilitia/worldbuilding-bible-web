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

type TProps<T> = TPostProps<T> & {
  isOpen: boolean,
  setIsOpen: (open: boolean) => any
}
const PostDialog = <T,>({
  isOpen,
  setIsOpen,
  contentPlaceholder,
  form,
  fields,
  isNew = true,
  canEdit = false,
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
              <PageTitleField value={form.newData?.name || ''}
                              onChange={(value) => form.handleOnFieldChange('name', value)}
                              placeholder={'Name'}
                              canEdit={isNew || canEdit}
              />
            </Dialog.Title>
            <Dialog.Description>
              <div className="flex flex-wrap lg:flex-row-reverse justify-center -mx-3">
                {!isEmpty(fields) && (
                  <div className="w-full lg:w-1/4 px-6">
                    <InfoBar
                      loading={form.loading}
                      onChange={form.handleOnFieldChange}
                      data={form.newData}
                      fields={fields?.fields}
                      disabled={!canEdit && !isNew}
                    />
                  </div>
                )}
                <div className={`w-full md:w-3/4 max-w-2xl px-3 lg:flex-1`}>
                  {Object.keys(form.errors).length > 0 && <ErrorBanner errors={form.errors}/>}
                  {(isNew || canEdit) && (
                    <FormToolbar
                      canManuallySave={true}
                      canRefresh={!isNew}
                      canDelete={canEdit}
                      onSave={form.handleOnSave}
                      onRefresh={form.handleOnFetch}
                      onDelete={form.handleOnDelete}
                    />
                  )}
                  <Editor
                    initialValue={form.fetchedData?.content}
                    onChange={(value) => form.handleOnFieldChange('content', value)}
                    placeholder={contentPlaceholder}
                    canEdit={isNew || canEdit}
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