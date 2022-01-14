import {mergeDisallowDuplicateKeys} from "../library/collection-util";
import * as R from "ramda";
import {mergeRight} from "ramda";

const createAuthentication = fetch => {
    let loginInformation = {}
    const getLoginInformation = async () => {
        if(loginInformation.accessToken) return loginInformation
        const refreshResponse = await fetch('/proxy/Refresh')
        loginInformation = await refreshResponse.json()
        return loginInformation
    }
    const clearAccessToken = () => {
        loginInformation.accessToken = undefined
    }
    const getUserName = async () =>{
        await getLoginInformation()
        return loginInformation.userName
    }
    const getRole = async () => {
        await getLoginInformation()
        return loginInformation.role
    }
    const fetchUsingAccessToken = async (resource, originalInit) => {
        const existingHeaders = (originalInit || {}).headers || []
        const authenticationHeader = {
            'Authorization': `Bearer ${loginInformation.accessToken}`
        }
        const headers = mergeDisallowDuplicateKeys(existingHeaders, authenticationHeader)
        const init = mergeRight(originalInit, {headers})
        const response = await fetch(resource, init)
        return response

    }
    const fetchUsingRefreshToken = async (resource, init) => {
        const refreshResponse = await fetch('/proxy/Refresh')
        if (refreshResponse.ok) {
            loginInformation = await refreshResponse.json()
            return await fetchUsingAccessToken(resource, init)
        } else {
            return refreshResponse
        }
    }
    const authenticatedFetch = async (resource, init) => {
        if (!loginInformation.accessToken) return await fetchUsingRefreshToken(resource, init)
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
        getUserName,
        getRole,
        clearAccessToken
    }
}

export default createAuthentication
