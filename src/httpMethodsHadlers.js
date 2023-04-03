import {publicRequest} from "./requestMethods";

const getMethod = async (url, set, mult) => {
    try {
        const response = await publicRequest.get(url)
        set.map((item) => item(response.data))
    } catch (e) {
        alert(e)
    }
}

const postMethod = async (event, url, myJson, config, codeAndMessage) => {
    event.preventDefault()
    try {
        await publicRequest.post(url, myJson, config).then((res) => console.log(res.data))
    } catch (e) {
        const statusCode = e.response ? e.response.status : null
        let mes = ""
        codeAndMessage.map((item) => {
            if (statusCode === item.code) return mes = item.message
            return null
        })
        alert(mes)

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

const putMethod = async (event, url, myJson, config, codeAndMessage) => {
    event.preventDefault()
    try {
        await publicRequest.put(url, myJson, config).then((res) => console.log(res.data))
    } catch (e) {
        const statusCode = e.response ? e.response.status : null
        let mes = ""
        codeAndMessage.map((item) => {
            if (statusCode === item.code) return mes = item.message
            return null
        })
        alert(mes)

    }
}

export {getMethod, postMethod, deleteMethod, putMethod}