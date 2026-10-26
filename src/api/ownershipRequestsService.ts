import type { CreateOwnershipRequestInput, OwnershipRequest, OwnershipRequestsResponse, OwnershipRequestStatus } from "../types/ownershipRequest";
import { getAuthHeaders } from "./authHeaders";
import baseUrl, { MAX_PAGE_SIZE } from "./axiosInstance";

export const createOwnershipRequest=async (requet:CreateOwnershipRequestInput)=>{
const res=await baseUrl.post<OwnershipRequest>("/ownership-requests",requet, getAuthHeaders());
return res.data;
}
export const getRequests= async(status?:OwnershipRequestStatus)=>{
    const res = await baseUrl.get<OwnershipRequestsResponse>(
    "/ownership-requests",
    { ...getAuthHeaders(), params: { status, pageSize: MAX_PAGE_SIZE } }
  );
    return res.data
}

export const getRequestsById= async(id:number)=>{
    const res = await baseUrl.get<OwnershipRequestsResponse>(
    `/ownership-requests/${id}`,
    getAuthHeaders()
  );
    return res.data
}
export const approveRequest = async (id: number) => {
  const response = await baseUrl.patch<OwnershipRequest>(
    `/ownership-requests/${id}/approve`,
    {},
    getAuthHeaders()
  );

  return response.data;
};
export const rejectRequest = async (id: number, rejectionReason: string) => {
  const response=await baseUrl.patch<OwnershipRequest>(
    `/ownership-requests/${id}/reject`,
    { rejectionReason },
    getAuthHeaders()
  );
  return response.data
};
