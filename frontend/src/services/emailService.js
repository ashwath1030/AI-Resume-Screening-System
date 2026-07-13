// import axios from "axios";

// const API_URL = "http://127.0.0.1:8000/email";

// export const sendEmail = async (data) => {
//   const response = await axios.post(`${API_URL}/send`, data);
//   return response.data;
// };

import axios from "axios";

const API = "http://127.0.0.1:8000";

export const sendEmail = async (data) => {

    const token = localStorage.getItem("token");

    return axios.post(
        `${API}/email/send`,
        data,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
};