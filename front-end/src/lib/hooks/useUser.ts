import { useQuery } from "@tanstack/react-query";
import { fetchAllUser ,addUser} from "../api/user.api";

export function useFetchAllUser() {
    return useQuery({
      queryKey: ['all_users'],
      queryFn: async () => {
        const users = await fetchAllUser();
        return users;
      }
    });
  }



  