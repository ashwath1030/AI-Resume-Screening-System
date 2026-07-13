import api from "./api";

export const rankCandidates = async (jobId) => {
    const response = await api.get(`/ranking/${jobId}`);
    return response.data;
};