import {composeFetchErrorMessage, composeFetchJsonErrorMessage} from "../library/error-util";

const createEnvironment = (
    {
        fetch,
        history,
        sessionStorage
    }) => {
    const fetchText = async (resource, init) => {
        try {
            const response = await fetch(resource, init)
            const text = await response.text()
            return text
        } catch (error) {
            throw Error(composeFetchErrorMessage({resource, init, error}))
        }
    }
    const fetchJson = async (resource, init) => {
        const text = await fetchText(resource, init)
        try {
            return JSON.parse(text)
        } catch (error) {
            throw Error(composeFetchJsonErrorMessage({resource, init, text, error}))
        }
    }

    const fetchApi = async (resource, init) => {
        const response = await fetch(resource, init)
        const json = await response.json()
        const ok = response.ok
        return {ok, json}
    }

    return {
        history,
        fetchText,
        fetchJson,
        fetchApi,
        sessionStorage
    }
}

export default createEnvironment
