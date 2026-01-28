import { FunctionComponent } from 'react'
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
import { useNoteIndexDataManager, } from '@/hooks/DataManagers'
import { kebabCase, startCase } from 'lodash'
import { TCampaignRelationships, TCompendiumRelationships } from '@/types'
import { useCurrentCompendium } from '@/hooks/useCurrentCompendium'
import { useCurrentCampaign } from '@/hooks/useCurrentCampaign'

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

  const { campaign } = useCurrentCampaign()
  const { compendium } = useCurrentCompendium()
  const { notes } = useNoteIndexDataManager()
  const { campaignPath, compendiumPath } = useUrlFormatter()

  return (
    <CommandDialog isOpen={isOpen} setIsOpen={setIsOpen}>
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
              'naturalResources',
              'pantheons',
              'planes',
              'religions',
              'species',
              'spells',
              'stories',
            ].map((path) => (
              <CommandGroup heading={startCase(path)}>
                {compendium[path as keyof TCompendiumRelationships]?.map((entity, i) => (
                    <CommandItem
                      key={i}
                      onSelect={() => onSelect(`${compendiumPath}/${kebabCase(path)}/${entity.id}/${entity.slug}`)}
                    >
                      {entity.name}
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
            <CommandGroup heading={startCase(path)}>
              {campaign[path as keyof TCampaignRelationships]?.map(
                entity => (
                  <CommandItem
                    onSelect={() => onSelect(
                      `${campaignPath}/${kebabCase(path)}/${entity.id}/${entity.slug}`)}
                  >
                    {entity.name}
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
                {note.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}

export default SearchDialog