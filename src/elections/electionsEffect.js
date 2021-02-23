import electionsDispatch from './electionsDispatch'
import electionsEvent from './electionsEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";

const fetchElectionsRequest = environment => function* (event) {
    const result = yield environment.authenticatedFetch(`/proxy/ListElections`)
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(electionsDispatch.fetchElectionsSuccess(jsonResult.elections))
    } else {
        yield put(electionsDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const addElectionRequest = environment => function* (event) {
    const body = {
        name: event.name
    }
    const result = yield environment.authenticatedFetch(
        `/proxy/AddElection`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        }
    )
    if (result.ok) {
        yield put(electionsDispatch.electionNameChanged(''))
        yield put(electionsDispatch.fetchElectionsRequest())
    } else {
        const jsonResult = yield result.json()
        yield put(electionsDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const genericError = _ => function* (error, event) {
    yield put(electionsDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const electionsEffect = {
    [electionsEvent.FETCH_ELECTIONS_REQUEST]: fetchElectionsRequest,
    [electionsEvent.ADD_ELECTION_REQUEST]: addElectionRequest,
    [electionsEvent.GENERIC_ERROR]: genericError
}

export default electionsEffect
