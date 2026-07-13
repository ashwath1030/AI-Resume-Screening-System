import axios from "axios";

const API = "http://127.0.0.1:8000/jobs";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getJobs = async () => {
  const response = await axios.get(API, authHeader());
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await axios.post(
    API,
    jobData,
    authHeader()
  );
  return response.data;
};

export const updateJob = async (jobId, jobData) => {
  const response = await axios.put(
    `${API}/${jobId}`,
    jobData,
    authHeader()
  );
  return response.data;
};

export const deleteJob = async (jobId) => {
  const response = await axios.delete(
    `${API}/${jobId}`,
    authHeader()
  );
  return response.data;
};