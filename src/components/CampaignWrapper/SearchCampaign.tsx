import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/Forms/Fields/Button'
import * as React from 'react'
import {
  CommandDialog,
  CommandEmpty, CommandGroup,
  CommandInput, CommandItem,
  CommandList, CommandSeparator,
} from '@/components/Command'
import {
  useCampaignDataManager,
  useCompendiumDataManager, useNoteIndexDataManager,
} from '@/hooks/DataManagers'
import { Link } from 'react-router-dom'
import useUrlFormatter from '@/hooks/useUrlFormatter'

const SearchCampaign = () => {

  const { campaign } = useCampaignDataManager()
  const { compendium } = useCompendiumDataManager()
  const { notes } = useNoteIndexDataManager()
  const [openSearchDialog, setOpenSearchDialog] = useState(false)

  const { compendiumPath } = useUrlFormatter()

  return <>
    <Button onClick={() => setOpenSearchDialog(true)} variant={'ghost'}
            size={'small_icon'}>
      <SearchIcon size={16}/>
      <CommandDialog isOpen={openSearchDialog} setIsOpen={setOpenSearchDialog}>
        <CommandInput placeholder="Search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {compendium && (
            <>
              {[
                'characters',
                'concepts',
                'currencies',
                'deities',
                'factions',
                'items',
                'languages',
                'locations',
                'pantheons',
                'planes',
                'religions',
                'species',
                'spells',
                'stories',
              ].map((path) => (
                <CommandGroup heading={path}>
                  {compendium[path as 'characters' | 'concepts' | 'currencies' | 'deities' | 'factions' | 'items' | 'languages' | 'locations' | 'pantheons' | 'planes' | 'religions' | 'species' | 'spells' | 'stories']?.map(entity => (
                    <CommandItem>
                      <Link
                        to={`${compendiumPath}/${path}/${entity.slug}`}>{entity.name}</Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CommandSeparator/>
            </>
          )}
          {campaign && (
            <>
              {[
                'scenes',
                'quests',
                'encounters',
                'sessions',
              ].map((path) => (
                <CommandGroup heading={path}>
                  {campaign[path as 'scenes' | 'quests' | 'encounters' | 'sessions']?.map(entity => (
                    <CommandItem>
                      <Link to={`/campaigns/${campaign.slug}/${path}/${entity.slug}`}>{entity.name}</Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CommandSeparator/>
            </>
          )}
          {notes && (
            <CommandGroup heading={'Notes'}>
              {notes.map(note => (
                <CommandItem>
                  <Link to={`/notes/${note.slug}`}>{note.name}</Link>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </Button>
  </>
}

export default SearchCampaign