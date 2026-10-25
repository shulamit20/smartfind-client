import type { Match } from "../types/foundItem";
import type { LostReportInput ,LostReport, LostReportsResponse} from "../types/lostReport";
import { getAuthHeaders } from "./authHeaders";
import baseUrl from "./axiosInstance";

export const createLostReport=async (lostReport:LostReportInput )=>{
const res=await baseUrl.post<LostReport>("/lost-reports",lostReport,getAuthHeaders());
return res.data;
}
export const updateLostReport=async (id:number,lostReport:LostReportInput )=>{
const res=await baseUrl.put<LostReport>(`/lost-reports/${id}`,lostReport,getAuthHeaders());
return res.data;
}
export const getMyReports= async()=>{
    const res = await baseUrl.get<LostReportsResponse>(
    "/lost-reports",
    getAuthHeaders()
  );
    return res.data
}
export const getReportById= async(id:number)=>{
    const res = await baseUrl.get<LostReport>(
   `/lost-reports/${id}`,
    getAuthHeaders()
  );
    return res.data
}

export const getMatches= async(id:number)=>{
    const res = await baseUrl.get<Match[]>(
    `/lost-reports/${id}/matches`,
    getAuthHeaders()
  );
    return res.data
}



