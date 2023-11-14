import { useQuery, useMutation } from "@tanstack/react-query";
import { repositories } from "./repositories";

export const useGetAPI = (params: string, query: string) => {
  return useQuery({ queryKey: [query], queryFn: () => repositories.getApi(params) });
};

export const usePostApi = (params: string) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await repositories.postApi(params, data);
      return res.data;
    },
  });
};

export const useUpdateApi = (params: string) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await repositories.postApi(params, data);
      return res.data;
    },
  });
};

export const useDeleteApi = (params: string) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await repositories.postApi(params, data);
      return res.data;
    },
  });
};
