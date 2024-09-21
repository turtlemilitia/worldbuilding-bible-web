import React, {JSX} from 'react'
import {Button, Dialog} from '@headlessui/react'
import {FloatingBox} from '../FloatingBox'
import {ErrorBanner} from '../Banners/ErrorBanner'
import FormToolbar from '../Forms/FormToolbar'
import {Editor} from '../Forms/Fields/Editor'
import PageTitleField from '../Forms/Fields/PageTitleField'
import InfoBar from '../InfoBar'
import {TPostProps} from '../Post/types'
import {isEmpty} from 'lodash'
import {TGenericPost} from '../../types'
import {XIcon} from 'lucide-react'
import LoadingWrapper from '../LoadingWrapper'

type TProps<T> = TPostProps<T> & {
    isOpen: boolean,
    setIsOpen: (open: boolean) => any
}
const PostDialog = <T extends TGenericPost, >({
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
                <div className={'w-full lg:w-2/3 min-h-64 max-h-full max-w-6xl'}>
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
                                    <div className={`w-full md:w-3/4 px-3 lg:flex-1`}>
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
                                            />
                                        )}
                                        <FloatingBox className={'max-h-[calc(100vh/2)] overflow-scroll'}>
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
                </div>
            </div>
        </Dialog>
    )
}

export default PostDialog
