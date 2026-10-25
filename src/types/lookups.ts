export type LookupItem = {
  id: number;
  name: string;
};

export type Lookups = {
  categories: LookupItem[];
  colors: LookupItem[];
  locations: LookupItem[];
};