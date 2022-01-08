import electionDispatch from './electionDispatch'
import electionEvent from './electionEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import * as R from 'ramda'
import {userDateToIso, isoDateToWellFormed} from "../library/date-time-util";

const convertIsoDatesToWellFormed = electionEdits => {
    const apiFormattedDates = R.pick(['scheduledStart', 'scheduledEnd'], electionEdits)
    const userFormattedDates = R.map(isoDateToWellFormed,  apiFormattedDates)
    const userElectionEdits = R.mergeRight(electionEdits, userFormattedDates)
    return userElectionEdits
}

const fetchElectionRequest = environment => function* (event) {
    const name = event.name
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
        const election = convertIsoDatesToWellFormed(jsonResult.election)
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

const convertDatesToInstants = electionEdits => {
    const userFormattedDates = R.pick(['scheduledStart', 'scheduledEnd'], electionEdits)
    const apiFormattedDates = R.map(userDateToIso,  userFormattedDates)
    const apiElectionEdits = R.mergeRight(electionEdits, apiFormattedDates)
    return apiElectionEdits
}

const updateElectionRequest = environment => function* (event) {
    const body = convertDatesToInstants(event.updates)
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

const electionEffect = {
    [electionEvent.FETCH_ELECTION_REQUEST]: fetchElectionRequest,
    [electionEvent.DELETE_ELECTION_REQUEST]: deleteElectionRequest,
    [electionEvent.UPDATE_ELECTION_REQUEST]: updateElectionRequest
}

export default electionEffect
