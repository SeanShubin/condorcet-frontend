import * as R from 'ramda'

const createApi = environment => {
    const authenticatedFetch = environment.authenticatedFetch
    const fetch = environment.fetch
    const invokeApiBase = theFetch => async (name, parameters) => {
        const result = await theFetch(
            `/proxy/${name}`,
            {
                method: 'POST',
                body: JSON.stringify(parameters)
            }
        )
        if (result.ok) {
            const text = await result.text()
            try {
                return JSON.parse(text)
            } catch (ex) {
                return text
            }
        } else {
            const resultJson = await result.json()
            throw Error(resultJson.userSafeMessage)
        }
    }

    const invokeApi = invokeApiBase(authenticatedFetch)

    const invokeApiNoAuth = invokeApiBase(fetch)

    const authenticate = async ({nameOrEmail, password}) => {
        return invokeApiNoAuth('Authenticate', {nameOrEmail, password})
    }

    const register = async ({userName, email, password}) => {
        return invokeApiNoAuth('Register', {userName, email, password})
    }

    const userCount = async () => {
        return invokeApi('UserCount')
    }

    const electionCount = async () => {
        return invokeApi('ElectionCount')
    }

    const tableCount = async () => {
        return invokeApi('TableCount')
    }

    const eventCount = async () => {
        return invokeApi('EventCount')
    }

    const logout = async () => {
        return invokeApiNoAuth('Logout')
    }

    const listUsers = async () => {
        return invokeApi('ListUsers')
    }

    const setRole = async ({userName, role}) => {
        return invokeApi('SetRole', {userName, role})
    }

    const listElections = async () => {
        return invokeApi('ListElections')
    }

    const addElection = async ({electionName}) => {
        return invokeApi('AddElection', {electionName})
    }

    const listTables = async () => {
        return invokeApi('ListTables')
    }

    const tableData = async tableName => {
        return invokeApi('TableData', {tableName})
    }

    const debugTableData = async tableName => {
        return invokeApi('DebugTableData', {tableName})
    }

    const eventData = async () => {
        return invokeApi('EventData')
    }

    const getElection = async electionName => {
        return invokeApi('GetElection', {electionName})
    }

    const deleteElection = async electionName => {
        return invokeApi('DeleteElection', {electionName})
    }

    const launchElection = async ({electionName, allowEdit}) => {
        return invokeApi('LaunchElection', {electionName, allowEdit})
    }
    const finalizeElection = async electionName => {
        return invokeApi('FinalizeElection', {electionName})
    }
    const updateElection = async (
        {
            electionName,
            newElectionName,
            secretBallot,
            clearNoVotingBefore,
            noVotingBefore,
            clearNoVotingAfter,
            noVotingAfter
        }) => {
        return invokeApi('UpdateElection', {
            electionName,
            newElectionName,
            secretBallot,
            clearNoVotingBefore,
            noVotingBefore,
            clearNoVotingAfter,
            noVotingAfter
        })
    }

    const listCandidates = async electionName => {
        return invokeApi('ListCandidates', {electionName})
    }

    const setCandidates = async ({electionName, candidateNames}) => {
        return invokeApi('SetCandidates', {electionName, candidateNames})
    }

    const listEligibility = async electionName => {
        return invokeApi('ListEligibility', {electionName})
    }

    const setEligibleVoters = async ({electionName, userNames}) => {
        return invokeApi('SetEligibleVoters', {electionName, userNames})
    }

    const isEligible = async ({userName, electionName}) => {
        return invokeApi('IsEligible', {userName, electionName})
    }

    const castBallot = async ({voterName, electionName, rankings}) => {
        return invokeApi('CastBallot', {voterName, electionName, rankings})
    }

    const tally = async electionName => {
        return invokeApi('Tally', {electionName})
    }

    const listRankings = async ({voterName, electionName}) => {
        return invokeApi('ListRankings', {voterName, electionName})
    }

    const getBallot = async ({voterName, electionName}) => {
        return invokeApi('GetBallot', {voterName, electionName})
    }

    return {
        authenticate,
        register,
        logout,
        userCount,
        electionCount,
        tableCount,
        eventCount,
        listUsers,
        setRole,
        listElections,
        addElection,
        listTables,
        tableData,
        debugTableData,
        eventData,
        getElection,
        deleteElection,
        launchElection,
        finalizeElection,
        updateElection,
        listCandidates,
        setCandidates,
        listEligibility,
        setEligibleVoters,
        isEligible,
        castBallot,
        tally,
        listRankings,
        getBallot
    }
}

const hasPermission = loginInformation => permission => {
    if(loginInformation) {
        if(R.includes(permission, loginInformation.permissions)) {
            return true
        }
    }
    return false
}

const TRANSFER_OWNER = "TRANSFER_OWNER"
const VIEW_SECRETS = "VIEW_SECRETS"
const MANAGE_USERS = "MANAGE_USERS"
const USE_APPLICATION = "USE_APPLICATION"
const VIEW_APPLICATION = "VIEW_APPLICATION"


export {createApi, hasPermission, TRANSFER_OWNER, VIEW_SECRETS, MANAGE_USERS, USE_APPLICATION, VIEW_APPLICATION}
