import apiClient from "@/lib/api-client";
import { useQuery, useMutation, QueryKey, UseMutationOptions } from "@tanstack/react-query";

export function useFetchData<T>(
  queryKey: QueryKey,
  url: string,
  options = {}
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await apiClient.get(url);
      return response.data as T;
    },
    ...options
  });
};

export function usePostData<T, E>(url: string, options: Omit<UseMutationOptions<T, Error, E, "unknown">, 'mutationFn'>) {
  return useMutation<T, Error, E, "unknown">({
    mutationFn: async (data: E) => {
      const response = await apiClient.post<T>(url, data);
      return response.data;
    },
    ...options
  });
}
