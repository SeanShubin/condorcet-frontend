import createAuthentication from "./authentication";

const createEnvironment = (
    {
        fetch,
        history
    }) => {
    const fetchWithBetterJsonErrorMessage = async (resource, init) => {
        const response = await fetch(resource, init)
        const json = async () => {
            const text = await response.text()
            try {
                const jsonValue = JSON.parse(text)
                return jsonValue
            } catch (ex) {
                throw Error(`unable to parse json from ${JSON.stringify({resource, init})}, got:\n${text}`)
            }
        }
        return {
            headers: response.headers,
            ok: response.ok,
            status: response.status,
            json,
            text: response.text
        }
    }
    const {
        authenticatedFetch,
        setAccessToken
    } = createAuthentication(fetchWithBetterJsonErrorMessage)
    return {
        authenticatedFetch,
        setAccessToken,
        history,
        fetch: fetchWithBetterJsonErrorMessage
    }
}

export default createEnvironment
