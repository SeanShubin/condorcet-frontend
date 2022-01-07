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

const navigateBallot = environment => function* (event) {
    const voter = event.voterName
    const election = event.electionName
    const uri = `/ballot?voter=${voter}&election=${election}`
    yield put(navigationDispatch.setUri(uri))
}

const navigateTally = environment => function* (event) {
    const election = event.electionName
    const uri = `/tally?election=${election}`
    yield put(navigationDispatch.setUri(uri))
}

const electionEffect = {
    [electionEvent.FETCH_ELECTION_REQUEST]: fetchElectionRequest,
    [electionEvent.DELETE_ELECTION_REQUEST]: deleteElectionRequest,
    [electionEvent.UPDATE_ELECTION_REQUEST]: updateElectionRequest,
    [electionEvent.NAVIGATE_BALLOT]: navigateBallot,
    [electionEvent.NAVIGATE_TALLY]: navigateTally
}

export default electionEffect
