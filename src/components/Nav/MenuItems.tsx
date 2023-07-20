
export interface MenuItemInterface {
  title: string;
  to: string;
  children?: MenuItemInterface[];
  special?: boolean;
}

export const menuItems: MenuItemInterface[] = [
  {
    title: 'Settings',
    to: '/settings',
    children: [
      {
        title: 'D&D',
        to: '/settings/dnd'
      },
      {
        title: 'Create new',
        to: '/settings/new',
        special: true
      }
    ]
  },
  {
    title: 'Campaigns',
    to: '/settings'
  },
  {
    title: 'Locations',
    to: '/settings'
  }
]