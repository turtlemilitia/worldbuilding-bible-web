import { ProtectedRoute } from './ProtectedRoute'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import React, { JSX, useCallback } from 'react'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import Login from '../pages/Login'
import System from '../pages/System/System'
import SystemsWrapper from '../pages/System/SystemsWrapper'
import PageWrapper from '../pages/PageWrapper'
import { useAppDispatch, useAppSelector } from '../hooks'
import { RootState } from '@/store'
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
import Note from '../pages/Notebook/Note'
import CampaignWrapper from '../pages/Campaign/CampaignWrapper'
import Campaign from '../pages/Campaign/Campaign'
import Session from '../pages/Campaign/Session'
import Religion from '../pages/Compendium/Religion'
import Currency from '../pages/Compendium/Currency'
import Deity from '../pages/Compendium/Deity'
import Encounter from '../pages/Campaign/Encounter'
import NaturalResource from '../pages/Compendium/NaturalResource'
import Plane from '../pages/Compendium/Plane'
import Quest from '../pages/Campaign/Quest'
import Spell from '../pages/Compendium/Spell'
import Story from '../pages/Compendium/Story'
import Pantheon from '../pages/Compendium/Pantheon'
import CompendiumWrapper from '../components/CompendiumWrapper/CompendiumWrapper'
import CampaignInvitation from '../pages/CampaignInvitation'
import CampaignInvitationService from '../services/ApiService/Campaigns/CampaignInvitationService'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import CampaignInvitationInvalid from '../pages/CampaignInvitationInvalid'
import { wait } from '@testing-library/user-event/dist/utils'
import QuestWrapper from '../components/QuestWrapper'
import EncounterWrapper from '../components/EncounterWrapper'
import SessionWrapper from '../components/SessionWrapper'
import NotesWrapper from '../pages/Notebook/NotebookWrapper'
import Scene from '../pages/Campaign/Scene'
import SceneWrapper from '../components/SceneWrapper'
import usePostDataManager from '../hooks/DataManagers/usePostDataManager'

const Routes = (): JSX.Element => {

  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  const { setLoading } = usePostDataManager();

  const loadPost = useCallback(() => {
    setLoading(true)
    return wait(250).then(() => true)
  }, [])

  // Define public routes accessible to all users
  const routesForPublic: RouteObject[] = [
    {
      path: '/about',
      element: <>TODO: About us</>
    },
    {
      path: '/campaigns/:campaignId/invitations/:token',
      element: <CampaignInvitation/>,
      loader: ({ params }) => CampaignInvitationService.check(params.campaignId as string, params.token as string)
        .then(({ data }) => data?.data),
      errorElement: <CampaignInvitationInvalid/>
    }
  ]

  // Define routes accessible only to authenticated users
  const compendiumRoutes = {
    path: 'compendia/:compendiumId',
    element: <CompendiumWrapper/>, // sidebar with bestiary, characters, locations, ...
    children: [
      {
        path: '',
        element: <Compendium/>,
        loader: loadPost
      },
      {
        path: 'characters/:characterId',
        element: <Character/>,
        loader: loadPost
      },
      {
        path: 'concepts/:conceptId',
        element: <Concept/>,
        loader: loadPost
      },
      {
        path: 'currencies/:currencyId',
        element: <Currency/>,
        loader: loadPost
      },
      {
        path: 'deities/:deityId',
        element: <Deity/>,
        loader: loadPost
      },
      {
        path: 'encounters/:encounterId',
        element: <Encounter/>,
        loader: loadPost
      },
      {
        path: 'factions/:factionId',
        element: <Faction/>,
        loader: loadPost
      },
      {
        path: 'items/:itemId',
        element: <Item/>,
        loader: loadPost
      },
      {
        path: 'languages/:languageId',
        element: <Language/>,
        loader: loadPost
      },
      {
        path: 'locations/:locationId',
        element: <Location/>,
        loader: loadPost
      },
      {
        path: 'natural-resources/:naturalResourceId',
        element: <NaturalResource/>,
        loader: loadPost
      },
      {
        path: 'pantheons/:pantheonId',
        element: <Pantheon/>,
        loader: loadPost
      },
      {
        path: 'planes/:planeId',
        element: <Plane/>,
        loader: loadPost
      },
      {
        path: 'quests/:questId',
        element: <Quest/>,
        loader: loadPost
      },
      {
        path: 'religions/:religionId',
        element: <Religion/>,
        loader: loadPost
      },
      {
        path: 'species/:speciesId',
        element: <Species/>,
        loader: loadPost
      },
      {
        path: 'spells/:spellId',
        element: <Spell/>,
        loader: loadPost
      },
      {
        path: 'stories/:storyId',
        element: <Story/>,
        loader: loadPost
      },
    ]
  }

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
              element: <System/>,
              loader: loadPost
            }
          ]
        },
        compendiumRoutes,
        {
          path: 'campaigns',
          children: [
            {
              path: ':campaignId',
              element: <CampaignWrapper/>, // sidebar with sessions, encounters, quests, ...
              children: [
                {
                  path: '',
                  element: <Campaign/>,
                  loader: loadPost,
                },
                compendiumRoutes,
                {
                  path: 'scenes',
                  element: <SceneWrapper/>,
                  loader: loadPost,
                  children: [
                    {
                      path: ':sceneId',
                      element: <Scene/>,
                      loader: loadPost
                    }
                  ]
                },
                {
                  path: 'quests',
                  element: <QuestWrapper/>,
                  loader: loadPost,
                  children: [
                    {
                      path: ':questId',
                      element: <Quest/>,
                      loader: loadPost
                    }
                  ]
                },
                {
                  path: 'encounters',
                  element: <EncounterWrapper/>,
                  loader: loadPost,
                  children: [
                    {
                      path: ':encounterId',
                      element: <Encounter/>,
                      loader: loadPost
                    }
                  ]
                },
                {
                  path: 'sessions',
                  element: <SessionWrapper/>,
                  loader: loadPost,
                  children: [
                    {
                      path: ':sessionId',
                      element: <Session/>,
                      loader: loadPost
                    }
                  ]
                }
              ]
            },
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
          path: '/notes',
          element: <NotesWrapper/>,
          children: [
            {
              path: ':noteId',
              element: <Note/>,
              loader: loadPost
            },
            {
              path: 'notebooks/:notebookId',
              element: <Notebook/>,
              loader: loadPost,
            },
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
    {
      path: '/register',
      element: <Register/>,
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
        ...routesForAuthenticatedOnly,
        {
          path: '*',
          element: <NotFound/>
        }
      ]
    }
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router}/>
}

export default Routes