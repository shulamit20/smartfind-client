import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { FoundItem, FoundItemInput, FoundItemsResponse, FoundItemStatus } from "../types/foundItem"
import type { AxiosError } from "axios"
import { createFoundItem, deleteFoundItem, getFoundItems } from "../api/foundItemsService"
import { getFoundItem } from "../api/foundItemsService";


export const useFoundItem= (id: number) => {
  return useQuery<FoundItem>({
    queryKey: ["item",id],
    queryFn:() =>getFoundItem(id),
  })};


export const useCreateFoundItem=()=>{
    return useMutation<FoundItem,AxiosError,FoundItemInput>({
      mutationFn:createFoundItem
    })
}
export const useFoundItems = (status?: FoundItemStatus) => {
  return useQuery<FoundItemsResponse>({
    queryKey: ["foundItems", status ?? "all"],
    queryFn: getFoundItems,
  });
};
export const useDeleteFoundItem = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: deleteFoundItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foundItems"] });
    },
  });
};