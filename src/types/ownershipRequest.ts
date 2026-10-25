
import type { LostReportStatus } from "./lostReport";
import type { FoundItemStatus } from "./foundItem";

export type OwnershipRequestStatus = "Pending" | "Approved" | "Rejected";

export type CreateOwnershipRequestInput = {
  lostReportId: number;
  foundItemId: number;
  answer: string;
};

export type OwnershipRequest = {
  id: number;
  status: OwnershipRequestStatus;
  verificationQuestion: string;
  answer: string;
  rejectionReason: string | null;
  reviewedAt: string | null;
  createdAt: string;
  lostReport: { id: number; title: string; status: LostReportStatus };
  foundItem: { id: number; title: string; status: FoundItemStatus };
  correctAnswer?: string; 
  user?: { id: number; fullName: string; email: string }; // רק אצל המנהל
};
export type OwnershipRequestsResponse = {
  items: OwnershipRequest[];
  total: number;
  page: number;
  pageSize: number;
};