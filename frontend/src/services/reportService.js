import axios from "axios";

const API = "http://127.0.0.1:8000";

export const downloadPDF = async () => {
    const response = await axios.get(`${API}/report-db/pdf`, {
        responseType: "blob",
    });
    return response.data;
};

export const downloadExcel = async () => {
    const response = await axios.get(`${API}/report-db/excel`, {
        responseType: "blob",
    });
    return response.data;
};