
import type { LookupItem } from "./lookups";

export type FoundItemStatus = "Available" | "Returned";

export type FoundItem = {
  id: number;
  title: string;
  description: string;
  category: LookupItem;
  color: LookupItem;
  location: LookupItem;
  foundDate: string;
  verificationQuestion: string;
  status: FoundItemStatus;
  createdAt: string;
  verificationAnswer?: string;
};

export type Match = {
  foundItem: FoundItem;
  score: number;
  breakdown: {
    category: boolean;
    color: boolean;
    location: boolean;
  };
};
export type FoundItemInput = {
  title: string;
  description: string;
  categoryId: number;
  colorId: number;
  locationId: number;
  foundDate: string; 
  verificationQuestion: string;
  verificationAnswer: string;
};
export type FoundItemsResponse = {
  items: FoundItem[];
  total: number;
  page: number;
  pageSize: number;
};