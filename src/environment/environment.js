import createAuthentication from "./authentication";
import {inspect} from 'util'

const createEnvironment = (
    {
        fetch,
        history,
        console
    }) => {
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
    } = createAuthentication(fetch)
    return {
        authenticatedFetch,
        fetchLoginInformation,
        clearAccessToken,
        history,
        fetch: fetch,
        genericError
    }
}

export default createEnvironment
