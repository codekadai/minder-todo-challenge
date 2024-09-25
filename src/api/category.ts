import { API_URL } from "./config";

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  const data = response.json();
  return data;
};
