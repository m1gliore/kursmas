import {publicRequest} from "./requestMethods";

const getMethod = async (url, set) => {
    try {
        const response = await publicRequest.get(url)
        set.map((item) => item(response.data))
    } catch (e) {
        alert(e)
    }
}

const postMethod = async (event, url, myJson) => {
    event.preventDefault()
    try {
        await publicRequest.post(url, myJson)
    } catch (e) {
        alert(e)
    }
}

export {getMethod, postMethod}