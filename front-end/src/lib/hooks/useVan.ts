import { useQuery } from "@tanstack/react-query";
import { fetchAllVan } from "../api/van.api";



export function useFetchVan() {
    return useQuery({
      queryKey: ['all_van'],
      queryFn: async () => {
        const users = await fetchAllVan();
        return users;
      }
    });
  }