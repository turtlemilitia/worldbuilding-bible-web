import { SidebarItemInterface } from '../../components/Sidebar/Sidebar';
import { TCampaign } from '@/types'

export type TUseCampaignsMappingProps = {
  campaignId: TCampaign['id'];
}

export type TUseCampaignsMapping = (props: TUseCampaignsMappingProps) => {
  mapQuest: (data: any) => SidebarItemInterface;
  mapEncounter: (data: any) => SidebarItemInterface;
  mapSession: (data: any) => SidebarItemInterface;
  mapScene: (data: any) => SidebarItemInterface;
}