import React, { FunctionComponent, JSX, useEffect, useState } from 'react'
import LoadingWrapper from '../../components/LoadingWrapper'
import HeaderWrapper from '../../components/HeaderWrapper'
import PageTitleField from '../../components/Forms/Fields/PageTitleField'
import { TCompendium } from '../../types'
import ContentWrapper from '../../components/ContentWrapper'
import { Editor } from '../../components/Forms/Fields/Editor'
import { storeCompendium, updateCompendium, viewCompendium } from '../../services/CompendiumService'
import { clearCompendiumData, setCompendiumData, updateCompendiumData } from '../../reducers/compendium/compendiumSlice'
import { AxiosError } from 'axios'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import FormToolbar from '../../components/Forms/FormToolbar'
import { addCompendium } from '../../reducers/compendium/compendiaIndexSlice'
import { ErrorBanner } from '../../components/Banners/ErrorBanner'
import Post from '../../components/Post/component'

const Compendium: FunctionComponent = (): JSX.Element => {

  const { compendium } = useAppSelector((state: RootState) => state.compendium) // redux

  const dispatch = useAppDispatch() // redux

  const { compendiumId } = useParams() as { compendiumId: string } // router

  const navigate = useNavigate()

  const isNew: boolean = !compendium.slug;

  const reset = () => {};

  const fetch = async () => {
    if (compendiumId && !isNew) {
      await viewCompendium(compendiumId)
        .then(response => {
          dispatch(updateCompendiumData(response.data.data))
        })
    }
    if (isNew) {
      reset()
    }

  }

  const submit = (data: any): Promise<TCompendium> => {
    if (isNew) {
      return storeCompendium(data)
        .then(({ data }) => {
          dispatch(updateCompendiumData(data.data))
          dispatch(addCompendium(data.data))
          navigate(`/compendia/${data.data.slug}`)
          return data.data
        })
    } else {
      return updateCompendium(compendiumId, data)
        .then(({ data }) => {
          dispatch(updateCompendiumData(data.data))
          return data.data;
        })
    }
  }

  return (
    <Post
      key={compendiumId}
      initialValues={compendium as TCompendium}
      onSubmit={submit}
      onFetch={fetch}
      ready={true}
      fields={[]}
      resetData={reset}
    />
  )
}

export default Compendium
