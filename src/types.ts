export interface TSystem {
  id?: number;
  slug?: string;
  name: string;
  content: string;
}

export interface TSetting {
  id?: number;
  slug?: string;
  name: string;
  content: string;
  hasLocations?: boolean;
}

export interface TLocationType {
  id: number;
  name: number;
}

export interface TLocationSize {
  id: number;
  name: number;
}

export interface TLocationGovernmentType {
  id: number;
  name: number;
}

export interface TLocation {
  id?: number;
  slug?: string;
  setting?: TSetting;
  parent?: TLocation;
  name: string;
  type?: TLocationType;
  size?: TLocationSize;
  content: string;
  demonym?: string;
  population?: number;
  governmentType?: TLocationGovernmentType;
  hasSubLocations?: boolean;
}