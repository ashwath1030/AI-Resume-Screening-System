import axios from "axios";

const API = "http://127.0.0.1:8000/auth";

export const login = async ({ email, password }) => {

    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await axios.post(
        `${API}/login`,
        formData,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    return response.data;
};
    export const register = async (userData) => {

    const response = await axios.post(
        `${API}/register`,
        userData
    );

    return response.data;
  
};