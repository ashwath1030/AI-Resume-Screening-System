import axios from "axios";

const API = "http://127.0.0.1:8000/candidates";

export const getCandidate = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};