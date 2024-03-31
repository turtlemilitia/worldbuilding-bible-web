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
import Religion from '../pages/Compendium/Religion'
import Currency from '../pages/Compendium/Currency'
import Deity from '../pages/Compendium/Deity'
import Encounter from '../pages/Compendium/Encounter'
import NaturalResource from '../pages/Compendium/NaturalResource'
import Plane from '../pages/Compendium/Plane'
import Quest from '../pages/Compendium/Quest'
import Spell from '../pages/Compendium/Spell'
import Story from '../pages/Compendium/Story'
import Pantheon from '../pages/Compendium/Pantheon'
import CompendiaWrapper from '../components/CompendiaWrapper/component'
import CampaignInvitation from '../pages/CampaignInvitation'
import { checkCampaignInvitation } from '../services/CampaignInvitationService'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import CampaignInvitationInvalid from '../pages/CampaignInvitationInvalid'
import { viewCompendium } from '../services/CompendiumService'


const Routes = (): JSX.Element => {

  const { token } = useAppSelector((state: RootState) => state.auth) // redux

  // Define public routes accessible to all users
  const routesForPublic: RouteObject[] = [
    {
      path: '/about',
      element: <>TODO: About us</>
    },
    {
      path: '/campaigns/:campaignId/invitations/:token',
      element: <CampaignInvitation/>,
      loader: ({params}) => checkCampaignInvitation(params.campaignId as string, params.token as string)
          .then(({ data }) => data?.data),
      errorElement: <CampaignInvitationInvalid/>
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
          path: '/compendia/:compendiumId',
          element: <CompendiaWrapper/>, // sidebar with bestiary, characters, locations, ...
          children: [
            {
              path: '/compendia/:compendiumId',
              element: <Compendium/>,
            },
            {
              path: 'characters/:characterId',
              element: <Character/>,
            },
            {
              path: 'concepts/:conceptId',
              element: <Concept/>,
            },
            {
              path: 'currencies/:currencyId',
              element: <Currency/>,
            },
            {
              path: 'deities/:deityId',
              element: <Deity/>,
            },
            {
              path: 'encounters/:encounterId',
              element: <Encounter/>,
            },
            {
              path: 'factions/:factionId',
              element: <Faction/>,
            },
            {
              path: 'items/:itemId',
              element: <Item/>,
            },
            {
              path: 'languages/:languageId',
              element: <Language/>,
            },
            {
              path: 'locations/:locationId',
              element: <Location/>,
            },
            {
              path: 'naturalResources/:naturalResourceId',
              element: <NaturalResource/>,
            },
            {
              path: 'pantheons/:pantheonId',
              element: <Pantheon/>,
            },
            {
              path: 'planes/:planeId',
              element: <Plane/>,
            },
            {
              path: 'quests/:questId',
              element: <Quest/>,
            },
            {
              path: 'religions/:religionId',
              element: <Religion/>,
            },
            {
              path: 'species/:speciesId',
              element: <Species/>,
            },
            {
              path: 'spells/:spellId',
              element: <Spell/>,
            },
            {
              path: 'stories/:storyId',
              element: <Story/>,
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
    },
    {
      path: '*',
      element: <NotFound/>
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
        ...routesForAuthenticatedOnly
      ]
    }
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router}/>
}

export default Routes