import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getDashboardStats = async () => {

    const response = await axios.get(
        `${API}/dashboard/stats`
    );

    return response.data;
};