import { useMutation, useQuery } from "@tanstack/react-query"
import { createLostReport, getMatches, getMyReports, updateLostReport } from "../api/lostReportsService"
import type { LostReport, LostReportInput } from "../types/lostReport"
import type { AxiosError } from "axios"
import type { LostReportsResponse } from "../types/lostReport";
import { getReportById } from "../api/lostReportsService";
import type { Match } from "../types/foundItem";


export const useReport= (id: number) => {
  return useQuery<LostReport>({
    queryKey: ["reports",id],
    queryFn:() =>getReportById(id),
     enabled: id > 0,
  })};


export const useMyReports= () => {
  return useQuery<LostReportsResponse>({
    queryKey: ["myReports"],
    queryFn: getMyReports,
  })};

export const useCreateLostReport=()=>{
    return useMutation<LostReport,AxiosError,LostReportInput>({
      mutationFn:createLostReport
    })
}
export const useUpdateLostReport = () => {
  return useMutation< LostReport,AxiosError,  { id: number; data: LostReportInput }>({
    mutationFn: ({ id, data }) =>
      updateLostReport(id, data)
  });
};

export const useMatches= (id: number) => {
  return useQuery<Match[]>({
    queryKey: ["matches",id],
    queryFn:() =>getMatches(id),
  })};
