import { SidebarItemInterface } from '../../Sidebar/Sidebar';

export type TUseCompendiaMappingProps = {
  prefix: string;
}

export type TUseCompendiaMapping = (props: TUseCompendiaMappingProps) => {
  mapConcept: (data: any) => SidebarItemInterface;
  mapSpecies: (data: any) => SidebarItemInterface;
  mapCharacter: (data: any) => SidebarItemInterface;
  mapLocation: (data: any) => SidebarItemInterface;
  mapItem: (data: any) => SidebarItemInterface;
  mapFaction: (data: any) => SidebarItemInterface;
  mapLanguage: (data: any) => SidebarItemInterface;
  mapReligion: (data: any) => SidebarItemInterface;
  mapPantheon: (data: any) => SidebarItemInterface;
  mapCurrency: (data: any) => SidebarItemInterface;
  mapStory: (data: any) => SidebarItemInterface;
  mapNaturalResource: (data: any) => SidebarItemInterface;
  mapPlane: (data: any) => SidebarItemInterface;
  mapDeity: (data: any) => SidebarItemInterface;
  mapQuest: (data: any) => SidebarItemInterface;
  mapSpell: (data: any) => SidebarItemInterface;
  mapEncounter: (data: any) => SidebarItemInterface;
}