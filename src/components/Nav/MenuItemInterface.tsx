export interface MenuItemInterface {
  title: string;
  to: string;
  hide?: boolean;
  children?: MenuItemInterface[];
}