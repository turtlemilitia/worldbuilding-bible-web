export interface TSystem {
  id?: string;
  slug?: string;
  name: string;
  content: string;
}

export interface TSetting {
  id?: string;
  slug?: string;
  name: string;
  content: string;
  hasLocations?: boolean;
}