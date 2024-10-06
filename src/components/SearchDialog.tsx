import { FunctionComponent, useEffect, useRef } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/Command'
import useUrlFormatter from '@/hooks/useUrlFormatter'
import {
  useCampaignDataManager,
  useCompendiumDataManager, useNoteIndexDataManager,
} from '@/hooks/DataManagers'
import { kebabCase, startCase } from 'lodash'
import { TCampaignRelationships, TCompendiumRelationships } from '@/types'

type TOwnProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => any
  onSelect: (link: string) => any
}
const SearchDialog: FunctionComponent<TOwnProps> = ({
  isOpen,
  setIsOpen,
  onSelect,
}) => {

  const { campaign } = useCampaignDataManager()
  const { compendium } = useCompendiumDataManager()
  const { notes } = useNoteIndexDataManager()
  const { compendiumPath } = useUrlFormatter()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <CommandDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <CommandInput placeholder="Search..." ref={inputRef}/>
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
              'naturalResources',
              'pantheons',
              'planes',
              'religions',
              'species',
              'spells',
              'stories',
            ].map((path) => (
              <CommandGroup heading={path}>
                {compendium[path as keyof TCompendiumRelationships]?.map(entity => (
                    <CommandItem
                      onSelect={() => onSelect(`${compendiumPath}/${kebabCase(path)}/${entity.slug}`)}
                    >
                      {startCase(entity.name)}
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
            <CommandSeparator/>
          </>
        )}

        {campaign && (
          [
            'scenes',
            'quests',
            'encounters',
            'sessions',
          ].map((path) => (
            <CommandGroup heading={path}>
              {campaign[path as keyof TCampaignRelationships]?.map(
                entity => (
                  <CommandItem
                    onSelect={() => onSelect(
                      `/campaigns/${campaign.slug}/${path}/${entity.slug}`)}
                  >
                    {startCase(entity.name)}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))
        )}
        <CommandSeparator/>
        {notes && (
          <CommandGroup heading={'Notes'}>
            {notes.map(note => (
              <CommandItem onSelect={() => onSelect(
                `${campaign ? `/campaigns/${campaign!.slug}` : ''}/notes/${note.slug}`
              )}>
                {startCase(note.name)}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}

export default SearchDialog