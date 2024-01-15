import axios from "axios";

const URL = "http://localhost:8000";

export const getPropertyData = async () => {
  return await axios.get(`${URL}/api/propertyList`);
};

export const postPropertyData = async () => {
  return await axios.post(`${URL}/api/propertyList`);
};
