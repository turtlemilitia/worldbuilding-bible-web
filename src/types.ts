export interface TSystem {
  id?: string;
  slug?: string;
  name: string;
  description: string;
}

export interface TSetting {
  id?: string;
  slug?: string;
  name: string;
  description: string;
  hasLocations?: boolean;
}