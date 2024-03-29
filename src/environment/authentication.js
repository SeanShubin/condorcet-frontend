import {mergeDisallowDuplicateKeys} from "../library/collection-util";
import * as R from "ramda";

const createAuthentication = fetch => {
    let loginInformation = null
    const setLoginInformation = newLoginInformation => {
        loginInformation = newLoginInformation
    }
    const fetchLoginInformation = async () => {
        const refreshResponse = await fetch('/api/Refresh')
        if(refreshResponse.ok){
            loginInformation = await refreshResponse.json()
        } else {
            loginInformation = null
        }
        return loginInformation
    }
    const clearAccessToken = () => {
        loginInformation = null
    }
    const fetchUsingAccessToken = async (resource, originalInit) => {
        const existingHeaders = (originalInit || {}).headers || []
        const authenticationHeader = {
            'Authorization': `Bearer ${loginInformation.accessToken}`
        }
        const headers = mergeDisallowDuplicateKeys(existingHeaders, authenticationHeader)
        const init = R.mergeRight(originalInit, {headers})
        const response = await fetch(resource, init)
        return response

    }
    const fetchUsingRefreshToken = async (resource, init) => {
        const refreshResponse = await fetch('/api/Refresh')
        if (refreshResponse.ok) {
            loginInformation = await refreshResponse.json()
            return await fetchUsingAccessToken(resource, init)
        } else {
            return refreshResponse
        }
    }
    const authenticatedFetch = async (resource, init) => {
        if (!loginInformation) return await fetchUsingRefreshToken(resource, init)
        const firstResult = await fetchUsingAccessToken(resource, init)
        if (firstResult.status === 401) {
            const secondResult = await fetchUsingRefreshToken(resource, init)
            if (secondResult.ok) {
                return secondResult
            } else {
                return firstResult
            }
        } else {
            return firstResult
        }
    }
    return {
        authenticatedFetch,
        setLoginInformation,
        fetchLoginInformation,
        clearAccessToken,
    }
}

export default createAuthentication
