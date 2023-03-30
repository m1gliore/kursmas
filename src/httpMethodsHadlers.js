import {publicRequest} from "./requestMethods";

const getMethod = async (url, set) => {
    try {
        const response = await publicRequest.get(url)
        set.map((item) => item(response.data))
    } catch (e) {
        alert(e)
    }
}

const postMethod = async (event, url, myJson, config) => {
    event.preventDefault()
    try {
        await publicRequest.post(url, myJson, config).then((res) => console.log(res.data))
    } catch (e) {
        alert(e)
    }
}

const deleteMethod = async (event, url, myJson) => {
    event.preventDefault()
    try {
        await publicRequest.delete(url, myJson)
    } catch (e) {
        alert(e)
    }
}

export {getMethod, postMethod, deleteMethod}