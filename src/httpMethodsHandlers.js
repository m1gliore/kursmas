import {publicRequest, userRequest} from "./requestMethods";

const getMethod = async (urlSet, config, codeAndMessage) => {
    try {
        urlSet?.map(async (item) => {
            const response = await publicRequest.get(item?.url, config)
            item?.set(response.data)
        })
    } catch (e) {
        const statusCode = e.response ? e.response.status : null
        let mes = ""
        codeAndMessage?.map((item) => {
            if (statusCode === item.code) return mes = item.message
            return null
        })
        mes ? alert(mes) : alert(e.message)
    }
}

const postMethod = async (url, data, config, codeAndMessage, set, user) => {
    try {
        await user
            ? userRequest.post(url, data, config).then((res) => set.map((item) => item(res.data)))
            : publicRequest.post(url, data, config).then((res) => set.map((item) => item(res.data)))
    } catch (e) {
        const statusCode = e.response ? e.response.status : null
        let mes = ""
        codeAndMessage.map((item) => {
            if (statusCode === item.code) return mes = item.message
            return null
        })
        mes ? alert(mes) : alert(e.message)
    }
}

const deleteMethod = async (url, config, codeAndMessage) => {
    try {
        await userRequest.delete(url, config)
    } catch (e) {
        const statusCode = e.response ? e.response.status : null
        let mes = ""
        codeAndMessage.map((item) => {
            if (statusCode === item.code) return mes = item.message
            return null
        })
        mes ? alert(mes) : alert(e.message)
    }
}

const putMethod = async (url, data, config, codeAndMessage) => {
    try {
        await userRequest.put(url, data, config).then((res) => console.log(res.data))
    } catch (e) {
        const statusCode = e.response ? e.response.status : null
        let mes = ""
        codeAndMessage.map((item) => {
            if (statusCode === item.code) return mes = item.message
            return null
        })
        mes ? alert(mes) : alert(e.message)
    }
}

export {getMethod, postMethod, deleteMethod, putMethod}