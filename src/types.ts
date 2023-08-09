export type TSystem = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
}

export type TSetting = {
  id?: number;
  slug?: string;
  name: string;
  content: string;
  hasLocations?: boolean;
}

export type TLocationType = {
  id: number;
  name: string;
}

export type TLocationSize = {
  id: number;
  name: string;
}

export type TLocationGovernmentType = {
  id: number;
  name: string;
}

export type TLocation = {
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