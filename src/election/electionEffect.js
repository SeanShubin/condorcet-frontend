import electionDispatch from './electionDispatch'
import electionEvent from './electionEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";

const fetchElectionRequest = environment => function* (event) {
    console.log(environment.history.location)
    const name = (new URLSearchParams(environment.history.location.search)).get('election')
    console.log(name)

    const body = {name}
    const result = yield environment.authenticatedFetch(
        `/proxy/GetElection`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(electionDispatch.fetchElectionSuccess(jsonResult.election))
    } else {
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
        yield put(electionDispatch.fetchElectionRequest())
    } else {
        const jsonResult = yield result.json()
        yield put(electionDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const updateElectionRequest = environment => function* (event) {
    const body = {updates: event.updates}
    const result = yield environment.authenticatedFetch(
        `/proxy/UpdateElection`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (result.ok) {
        yield put(electionDispatch.fetchElectionRequest())
    } else {
        const jsonResult = yield result.json()
        yield put(electionDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const genericError = _ => function* (error, event) {
    yield put(electionDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const electionEffect = {
    [electionEvent.FETCH_ELECTION_REQUEST]: fetchElectionRequest,
    [electionEvent.DELETE_ELECTION_REQUEST]: deleteElectionRequest,
    [electionEvent.UPDATE_ELECTION_REQUEST]: updateElectionRequest,
    [electionEvent.GENERIC_ERROR]: genericError
}

export default electionEffect
