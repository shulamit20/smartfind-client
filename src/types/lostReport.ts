import type { LookupItem } from "./lookups";

export type LostReportStatus = "Open" | "Returned";

// מה שנשלח לשרת ביצירה ובעריכה (לא משתנה)
export type LostReportInput = {
  title: string;
  description: string;
  categoryId: number;
  colorId: number;
  locationId: number;
  lostDate: string; // "2026-10-01"
};

export type LostReport = {
  id: number;
  title: string;
  description: string;
  category: LookupItem;
  color: LookupItem;
  location: LookupItem;
  lostDate: string;
  status: LostReportStatus;
  createdAt: string;
  owner: { id: number; fullName: string };
};
export type LostReportsResponse = {
  items: LostReport[];
  total: number;
  page: number;
  pageSize: number;
};