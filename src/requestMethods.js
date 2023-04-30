import axios from "axios";

axios.interceptors.request.use(res => {
    let ctype = res.headers["content-type"];
    if (ctype.includes("charset=ISO-8859-1")) {
        return new TextDecoder('ISO-8859-1').decode(res.data)
    }
})
export const publicRequest = axios.create()
export const userRequest = axios.create({
    headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`,
    }
})