import axios from "axios";

const API = "http://127.0.0.1:8000/profile";

export const getProfile = async () => {

    const token = localStorage.getItem("token");

    const response = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const updateProfile = async (data) => {

    const token = localStorage.getItem("token");

    const response = await axios.put(
        API,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};