
import type { FoundItem, FoundItemInput, FoundItemsResponse } from "../types/foundItem";
import { getAuthHeaders } from "./authHeaders";
import baseUrl, { MAX_PAGE_SIZE } from "./axiosInstance";

export const getFoundItem= async(id:number)=>{
    const res = await baseUrl.get<FoundItem>(
    `/found-items/${id}`,
     getAuthHeaders()
  );
    return res.data
}
export const getFoundItems = async () => {
  const res = await baseUrl.get<FoundItemsResponse>(
    "/found-items",
    { ...getAuthHeaders(), params: { pageSize: MAX_PAGE_SIZE } }
  );

  return res.data;
};

export const createFoundItem=async (item:FoundItemInput)=>{
const res=await baseUrl.post<FoundItem>("/found-items",item, getAuthHeaders());
return res.data;
}
export const deleteFoundItem = async (id: number) => {
  await baseUrl.delete(`/found-items/${id}`, getAuthHeaders());
};

