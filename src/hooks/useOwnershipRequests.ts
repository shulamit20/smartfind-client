import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateOwnershipRequestInput, OwnershipRequest, OwnershipRequestsResponse, OwnershipRequestStatus } from "../types/ownershipRequest";
import { createOwnershipRequest, getRequests, getRequestsById,approveRequest,rejectRequest } from "../api/ownershipRequestsService";
import type { AxiosError } from "axios";


export const useRequests= (status?: OwnershipRequestStatus) => {
  return useQuery<OwnershipRequestsResponse>({
    queryKey: ["requests",status??"All"],
    queryFn: ()=>getRequests(status),
  })};

export const useRequest = (id: number) => {
  return useQuery<OwnershipRequestsResponse>({
    queryKey: ["requestsById", id],
    queryFn: () => getRequestsById(id),
  });
};

export const useCreateOwnershipRequest=()=>{
    return useMutation<OwnershipRequest,AxiosError,CreateOwnershipRequestInput>({
      mutationFn:createOwnershipRequest
    })
}
export const useApproveRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<OwnershipRequest, AxiosError, number>({
    mutationFn: approveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
};
export const useRejectRequest=()=>{
    const queryClient = useQueryClient();
    return useMutation<OwnershipRequest,AxiosError,{ id:number, rejectionReason:string }>({
      mutationFn: ({ id, rejectionReason }) =>
      rejectRequest(id, rejectionReason)
    ,
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["requests"] })
    },
  })
}




