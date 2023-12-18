import { ProtectedRoute } from './ProtectedRoute'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import React, { JSX } from 'react'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import Login from '../pages/Login'
import System from '../pages/System/System'
import SystemsWrapper from '../pages/System/SystemsWrapper'
import PageWrapper from "../pages/PageWrapper";
import { useAppSelector } from '../hooks'
import { RootState } from '../store'
import CompendiaWrapper from '../pages/Compendium/CompendiaWrapper'
import Compendium from '../pages/Compendium/Compendium'
import Location from '../pages/Compendium/Location'
import Home from '../pages/Home'
import Character from '../pages/Compendium/Character'
import Species from '../pages/Compendium/Species'
import Item from '../pages/Compendium/Item'
import Concept from '../pages/Compendium/Concept'
import Faction from '../pages/Compendium/Faction'
import Language from '../pages/Compendium/Language'
import Notebook from '../pages/Notebook/Notebook'
import NotebooksWrapper from '../pages/Notebook/NotebooksWrapper'
import Note from '../pages/Notebook/Note/Note'
import CampaignsWrapper from '../pages/Campaign/CampaignsWrapper'
import Campaign from '../pages/Campaign/Campaign'
import Session from '../pages/Campaign/Session'


const Routes = (): JSX.Element => {

  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  // Define public routes accessible to all users
  const routesForPublic: RouteObject[] = [
    {
      path: '/about',
      element: <>TODO: About us</>
    }
  ]

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: '/',
      element: <ProtectedRoute/>, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: <>TODO: Dashboard</>,
        },
        {
          path: '/systems',
          element: <SystemsWrapper/>, // sidebar with list of systems
          children: [
            {
              path: '/systems/:systemId',
              element: <System/>
            }
          ]
        },
        {
          path: '/compendia',
          element: <CompendiaWrapper/>, // sidebar with bestiary, characters, locations, ...
          children: [
            {
              path: '/compendia/:compendiumId',
              element: <Compendium/>,
            },
            {
              path: '/compendia/:compendiumId/concepts/:conceptId',
              element: <Concept/>,
            },
            {
              path: '/compendia/:compendiumId/species/:speciesId',
              element: <Species/>,
            },
            {
              path: '/compendia/:compendiumId/locations/:locationId',
              element: <Location/>,
            },
            {
              path: '/compendia/:compendiumId/characters/:characterId',
              element: <Character/>,
            },
            {
              path: '/compendia/:compendiumId/items/:itemId',
              element: <Item/>,
            },
            {
              path: '/compendia/:compendiumId/factions/:factionId',
              element: <Faction/>,
            },
            {
              path: '/compendia/:compendiumId/languages/:languageId',
              element: <Language/>,
            },
          ]
        },
        {
          path: '/campaigns',
          element: <CampaignsWrapper/>, // sidebar with sessions, encounters, quests, ...
          children: [
            {
              path: '/campaigns/:campaignId',
              element: <Campaign/>
            },
            {
              path: '/campaigns/:campaignId/sessions/:sessionId',
              element: <Session/>
            }
          ]
        },
        {
          path: '/tools',
          element: <>TODO: Tools</> // sidebar with different tools
        },
        {
          path: '/stories',
          element: <>TODO: Stories</> // sidebar with list of stories/chapters
        },
        {
          path: '/notebooks',
          element: <NotebooksWrapper/>, // sidebar with list of stories/chapters
          children: [
            {
              path: '/notebooks/:notebookId',
              element: <Notebook/>
            },
            {
              path: '/notebooks/:notebookId/notes/:noteId',
              element: <Note/>
            }
          ]
        },
        {
          path: '/profile',
          element: <>TODO: User Profile</>
        },
      ]
    }
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: '/login',
      element: <Login/>,
    },
  ]

  // Combine and conditionally include routes based on authentication status
  const router: RemixRouter = createBrowserRouter([
    {
      path: '/',
      element: <PageWrapper/>,
      children: [
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []), // only add these conditionally
        ...routesForAuthenticatedOnly
      ]
    }
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router}/>
}

export default Routes