import { SidebarItemInterface } from '../../components/Sidebar/Sidebar';

export type TUseCampaignsMappingProps = {
  campaignId: string;
}

export type TUseCampaignsMapping = (props: TUseCampaignsMappingProps) => {
  mapQuest: (data: any) => SidebarItemInterface;
  mapEncounter: (data: any) => SidebarItemInterface;
  mapSession: (data: any) => SidebarItemInterface;
  mapScene: (data: any) => SidebarItemInterface;
}