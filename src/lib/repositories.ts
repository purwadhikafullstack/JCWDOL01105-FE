import axios from "axios";

const baseUrl = import.meta.VITE_BASE_URL;

class Repositories {
  async getApi(params: string) {
    const res = await axios.get(`${baseUrl}/${params}`);
    return res.data.data;
  }

  async postApi(params: string, data: any) {
    return await axios.post(`${baseUrl}/${params}`, data);
  }

  async putApi(params: string, data: any) {
    return await axios.put(`${baseUrl}/${params}`, data);
  }

  async deleteApi(params: string, data: any) {
    return await axios.delete(`${baseUrl}/${params}`, data);
  }
}

export const repositories = new Repositories();
