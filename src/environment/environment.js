import createAuthentication from "./authentication";
import {inspect} from 'util'

const createEnvironment = (
    {
        fetch,
        history,
        console
    }) => {
    const fetchWithBetterJsonErrorMessage = async (resource, init) => {
        const response = await fetch(resource, init)
        const json = async () => {
            const text = await response.text()
            try {
                const jsonValue = JSON.parse(text)
                return jsonValue
            } catch (ex) {
                throw Error(`unable to parse json from ${resource}, got:\n${text}`)
            }
        }
        response.json = json
        return response
    }
    const genericError = ({name, args, error}) => {
        const showHidden = false
        const depth = null // no depth limit, go all the way down
        const colorize = true
        const argsString = inspect(args, showHidden, depth, colorize)
        console.log(`error with effect ${name} and arguments ${argsString}`, error)
    }
    const {
        authenticatedFetch,
        fetchLoginInformation,
        clearAccessToken,
        setLoginInformation
    } = createAuthentication(fetchWithBetterJsonErrorMessage)
    return {
        authenticatedFetch,
        setLoginInformation,
        fetchLoginInformation,
        clearAccessToken,
        history,
        fetch:fetchWithBetterJsonErrorMessage,
        genericError
    }
}

export default createEnvironment
