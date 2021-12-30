import electionDispatch from './electionDispatch'
import electionEvent from './electionEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";

const fetchElectionRequest = environment => function* (event) {
    const name = (new URLSearchParams(environment.history.location.search)).get('election')
    const body = {name}
    const result = yield environment.authenticatedFetch(
        `/proxy/GetElection`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    const user = environment.getUserName()
    if (result.ok) {
        const jsonResult = yield result.json()
        const election = jsonResult.election
        const canUpdate = jsonResult.canUpdate
        yield put(electionDispatch.fetchElectionSuccess({user, election, canUpdate}))
    } else {
        const jsonResult = yield result.json()
        yield put(electionDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const deleteElectionRequest = environment => function* (event) {
    const body = {name: event.name}
    const result = yield environment.authenticatedFetch(
        `/proxy/DeleteElection`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (result.ok) {
        yield put(navigationDispatch.setUri('/elections'))
    } else {
        const jsonResult = yield result.json()
        yield put(electionDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const updateElectionRequest = environment => function* (event) {
    const body = event.updates
    const result = yield environment.authenticatedFetch(
        `/proxy/UpdateElection`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (result.ok) {
        if (body.newName) {
            yield put(navigationDispatch.setUri(`/election?election=${body.newName}`))
        } else {
            yield put(electionDispatch.fetchElectionRequest())
        }
    } else {
        const jsonResult = yield result.json()
        yield put(electionDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const navigateBallot = environment => function* (event) {
    const voter = event.voterName
    const election = event.electionName
    const uri = `/ballot?voter=${voter}&election=${election}`
    yield put(navigationDispatch.setUri(uri))
}

const electionEffect = {
    [electionEvent.FETCH_ELECTION_REQUEST]: fetchElectionRequest,
    [electionEvent.DELETE_ELECTION_REQUEST]: deleteElectionRequest,
    [electionEvent.UPDATE_ELECTION_REQUEST]: updateElectionRequest,
    [electionEvent.NAVIGATE_BALLOT]: navigateBallot
}

export default electionEffect
