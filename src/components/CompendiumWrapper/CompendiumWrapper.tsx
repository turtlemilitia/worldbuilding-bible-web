import React, { FunctionComponent, JSX, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { TCompendiaWrapperProps } from './types'
import CompendiumSidebar from './CompendiumSidebar'
import { useCompendiumDataManager, useNotebookDataManager } from '../../hooks/DataManagers'
import { compendiumIncludes } from '../../hooks/Forms/useCompendiumForm/useCompendiumForm'
import { notebookIncludes } from '../../hooks/Forms/useNotebookForm/useNotebookForm'

const CompendiumWrapper: FunctionComponent<TCompendiaWrapperProps> = (): JSX.Element => {

  const { compendium, view, clearData } = useCompendiumDataManager()
  const { notebook, view: viewNotebook, clearData: clearNotebook } = useNotebookDataManager()
  const { compendiumId } = useParams() as { compendiumId: string } // router

  useEffect(() => {
    if (compendiumId !== 'new') {
      view(compendiumId, { include: compendiumIncludes })
    }
    return () => {
      clearData(compendiumId)
    }
  }, [compendiumId])

  useEffect(() => {
    if (compendium?.notebook) {
      viewNotebook(compendium.notebook.slug, { include: notebookIncludes })
    }
    return () => {
      if (!compendium?.notebook && notebook) {
        clearNotebook(notebook.slug)
      }
    }
  }, [compendium?.notebook])

  return (
    <>
      {compendium && (
        <CompendiumSidebar compendium={compendium}/>
      )}
      <div className="relative w-full">
        <Outlet/>
      </div>
    </>
  )
}

export default CompendiumWrapper