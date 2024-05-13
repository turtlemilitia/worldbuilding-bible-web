import React, { FunctionComponent, JSX, useMemo } from 'react'
import { useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store'
import SavingDialog from '../../components/SavingDialog'
import { HeaderWrapper } from '../../components/HeaderWrapper'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import ContentWrapper from '../../components/ContentWrapper'
import { ErrorBanner } from '../../components/Banners/ErrorBanner'
import FormToolbar from '../../components/Forms/FormToolbar'
import { Editor } from '../../components/Forms/Fields/Editor'
import LoadingWrapper from '../../components/LoadingWrapper'
import InfoBar from '../../components/InfoBar'
import { useCharacterForm, useCharacterFields, useCharacterImageHandling } from '../../hooks/useCharacterForm'
import { TCharacter } from '../../types'

const Character: FunctionComponent = (): JSX.Element => {

  const { characterId } = useParams() as { compendiumId: string; characterId: string } // router

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const isNew: boolean = useMemo(() => characterId === 'new', [characterId])

  const form = useCharacterForm({ isNew });

  const fields = useCharacterFields({
    compendium,
    character: form.persistedData,
    onNoteCreated: (note) => form.updateAllData({ ...form.newData as TCharacter, notes: [...(form.newData?.notes ?? []), note] }),
    onNoteUpdated: (note) => form.updateAllData({ ...form.newData as TCharacter, notes: [...(form.newData?.notes ?? []), note] })
  });

  const canEdit: boolean = useMemo(() => isNew || form.persistedData?.canUpdate !== undefined, [isNew, form.persistedData?.canUpdate])

  const imageHandling = useCharacterImageHandling({persistedData: form.persistedData, updatePersistedData: form.updatePersistedData})

  return (
    <LoadingWrapper loading={form.loading || !fields.ready} opacity={'100'}>
      <SavingDialog saving={form.saving}/>
      <form onSubmit={(e => e.preventDefault())}>
        <HeaderWrapper
          page={'Character'}
          onCoverImageSelected={(id) => imageHandling.handleOnImageSelected(id, 'cover')}
          coverImage={imageHandling.getImage('cover')}
        >
          <PageTitleField value={form.newData?.name || ''}
                          onChange={(value) => form.handleOnFieldChange('name', value)}
                          placeholder={'Name'}
                          canEdit={canEdit}
          />
        </HeaderWrapper>
        <ContentWrapper>
          <div className="flex flex-wrap lg:flex-row-reverse lg:justify-between -mx-3">
            <div className="w-full lg:w-1/4 px-6">
              <InfoBar
                loading={form.loading}
                onChange={form.handleOnFieldChange}
                data={form.newData}
                fields={fields.fields}
                profileImage={imageHandling.getImage('profile')}
                onProfileImageSelected={(id) => imageHandling.handleOnImageSelected(id, 'profile')}
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
                  onSave={form.handleOnSave}
                  onRefresh={form.handleOnFetch}
                  onDelete={form.handleOnDelete}
                />
              )}
              <Editor
                initialValue={form.fetchedData?.content}
                onChange={(value) => form.handleOnFieldChange('content', value)}
                placeholder={'Write a piece.'}
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

export default Character
