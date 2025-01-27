import { ProtectedRoute } from './ProtectedRoute'
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom'
import React, { JSX } from 'react'
import { Router as RemixRouter } from '@remix-run/router/dist/router'
import Login from '../pages/Login'
import System from '../pages/System/System'
import SystemsWrapper from '../pages/System/SystemsWrapper'
import PageWrapper from '../pages/PageWrapper'
import { useAppSelector } from '@/hooks'
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
import Note from '@/pages/Note/Note'
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
import CompendiumWrapper
  from '../components/CompendiumWrapper/CompendiumWrapper'
import CampaignInvitation from '../pages/CampaignInvitation'
import CampaignInvitationService
  from '../services/ApiService/Campaigns/CampaignInvitationService'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import CampaignInvitationInvalid from '../pages/CampaignInvitationInvalid'
import QuestWrapper from '../components/QuestWrapper'
import EncounterWrapper from '../components/EncounterWrapper'
import SessionWrapper from '../components/SessionWrapper'
import NotesWrapper from '@/pages/Note/NotesWrapper'
import Scene from '../pages/Campaign/Scene'
import SceneWrapper from '../components/SceneWrapper'
import MarkdownExample from '@/pages/MarkdownExample'
import Quests from '@/pages/Campaign/Quests'
import Logout from '@/pages/Logout'

const Routes = (): JSX.Element => {

  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  // Define public routes accessible to all users
  const routesForPublic: RouteObject[] = [
    {
      path: '/about',
      element: <>TODO: About us</>,
    },
    {
      path: '/login',
      element: <Login/>,
    },
    {
      path: '/register',
      element: <Register/>,
    },
    {
      path: '/campaigns/:campaignId/:campaignSlug/invitations/:token',
      element: <CampaignInvitation/>,
      loader: ({ params }) => CampaignInvitationService.check(
        params.campaignId as string, params.token as string).
        then(({ data }) => data?.data),
      errorElement: <CampaignInvitationInvalid/>,
    },
  ]

  // Define routes accessible only to authenticated users
  const compendiumRoutes = {
    path: 'compendia/:compendiumId/:compendiumSlug?',
    element: <CompendiumWrapper/>, // sidebar with bestiary, characters, locations, ...
    children: [
      {
        path: '',
        element: <Compendium/>,
      },
      {
        path: 'characters/:characterId/:characterSlug?',
        element: <Character/>,
      },
      {
        path: 'concepts/:conceptId/:conceptSlug?',
        element: <Concept/>,
      },
      {
        path: 'currencies/:currencyId/:currencySlug?',
        element: <Currency/>,
      },
      {
        path: 'deities/:deityId/:deitySlug?',
        element: <Deity/>,
      },
      {
        path: 'encounters/:encounterId/:encounterSlug?',
        element: <Encounter/>,
      },
      {
        path: 'factions/:factionId/:factionSlug?',
        element: <Faction/>,
      },
      {
        path: 'items/:itemId/:itemSlug?',
        element: <Item/>,
      },
      {
        path: 'languages/:languageId/:languageSlug?',
        element: <Language/>,
      },
      {
        path: 'locations/:locationId/:locationSlug?',
        element: <Location/>,
      },
      {
        path: 'natural-resources/:naturalResourceId-naturalResourceSlug?',
        element: <NaturalResource/>,
      },
      {
        path: 'pantheons/:pantheonId/:pantheonSlug?',
        element: <Pantheon/>,
      },
      {
        path: 'planes/:planeId/:planeSlug?',
        element: <Plane/>,
      },
      {
        path: 'religions/:religionId/:religionSlug?',
        element: <Religion/>,
      },
      {
        path: 'species/:speciesId/:speciesSlug?',
        element: <Species/>,
      },
      {
        path: 'spells/:spellId/:spellSlug?',
        element: <Spell/>,
      },
      {
        path: 'stories/:storyId/:storySlug?',
        element: <Story/>,
      },
    ],
  }

  const notesRoutes = {
    path: 'notes',
    element: <NotesWrapper/>,
    children: [
      {
        path: ':noteId/:noteSlug',
        element: <Note/>,
      }
    ],
  }

  const routesForAuthenticatedOnly: RouteObject[] = [
    {
      path: '/',
      element: <ProtectedRoute/>, // Wrap the component in ProtectedRoute
      children: [
        {
          path: '/',
          element: <div className={'min-h-screen flex items-center justify-center'}>TODO: Dashboard</div>,
        },
        {
          path: '/markdown-example',
          element: <MarkdownExample/>
        },
        {
          path: '/systems',
          element: <SystemsWrapper/>, // sidebar with list of systems
          children: [
            {
              path: '/systems/:systemId/:systemSlug',
              element: <System/>,
            },
          ],
        },
        compendiumRoutes,
        {
          path: 'campaigns',
          children: [
            {
              path: ':campaignId/:campaignSlug?',
              element: <CampaignWrapper/>, // sidebar with sessions, encounters, quests, ...
              children: [
                {
                  path: '',
                  element: <Campaign/>,
                },
                compendiumRoutes,
                notesRoutes,
                {
                  path: 'scenes',
                  element: <SceneWrapper/>,
                  children: [
                    {
                      path: ':sceneId/:sceneSlug',
                      element: <Scene/>,
                    },
                  ],
                },
                {
                  path: 'quests',
                  element: <QuestWrapper/>,
                  children: [
                    {
                      path: '',
                      element: <Quests/>,
                    },
                    {
                      path: ':questId/:questSlug',
                      element: <Quest/>,
                    },
                  ],
                },
                {
                  path: 'encounters',
                  element: <EncounterWrapper/>,
                  children: [
                    {
                      path: ':encounterId/:encounterSlug',
                      element: <Encounter/>,
                    },
                  ],
                },
                {
                  path: 'sessions',
                  element: <SessionWrapper/>,
                  children: [
                    {
                      path: ':sessionId/:sessionSlug',
                      element: <Session/>,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          path: '/tools',
          element: <>TODO: Tools</>, // sidebar with different tools
        },
        {
          path: '/stories',
          element: <>TODO: Stories</>, // sidebar with list of stories/chapters
        },
        notesRoutes,
        {
          path: '/profile',
          element: <>TODO: User Profile</>,
        },
        {
          path: '/logout',
          element: <Logout/>
        },
        {
          path: '*',
          element: <NotFound/>,
        },
      ],
    },
  ]

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly: RouteObject[] = [
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: '*',
      element: <NotFound/>,
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
      ],
    },
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router}/>
}

export default Routes