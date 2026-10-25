import type { Lookups } from "../types/lookups"
import { getAuthHeaders } from "./authHeaders"
import baseUrl from "./axiosInstance";


export const getLookups= async () => {
    const res = await baseUrl.get<Lookups>("/lookups", getAuthHeaders()
    )
    return res.data
}

