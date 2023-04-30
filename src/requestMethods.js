import axios from "axios";

export const publicRequest = axios.create()
export const userRequest = axios.create({
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`,
    }
})