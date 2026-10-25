import { useQuery } from "@tanstack/react-query";
import { getLookups } from "../api/lookupsService";
import type { Lookups } from "../types/lookups";

export const useLookups = () => {
  return useQuery<Lookups>({
    queryKey: ["lookups"],
    queryFn: getLookups,
  })};


