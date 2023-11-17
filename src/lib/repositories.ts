import axios, { AxiosRequestConfig } from "axios";


const baseURL = import.meta.env.VITE_BASE_URL;
const axiosClient = axios.create({ baseURL: baseURL, timeout: 3000 });

class Repositories {
  async getApi(params: string, headers: AxiosRequestConfig) {
    const res = await axiosClient.get(`${params}`, headers);
    return res.data.data;
  }

  async postApi(params: string, data: unknown, headers: AxiosRequestConfig) {
    return await axiosClient.post(`${params}`, data, headers);
  }

  async putApi(params: string, data: unknown, headers: AxiosRequestConfig) {
    return await axiosClient.put(`${params}`, data, headers);
  }

  async deleteApi(params: string, headers: AxiosRequestConfig) {
    return await axiosClient.delete(`${params}`, headers);
  }
}

export const repositories = new Repositories();
