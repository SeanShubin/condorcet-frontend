import electionDispatch from './electionDispatch'
import electionEvent from './electionEvent'
import {put} from 'redux-saga/effects'
import navigationDispatch from "../navigation/navigationDispatch";
import * as R from 'ramda'
import {userDateToIso, isoDateToWellFormed} from "../library/date-time-util";
import {createApi} from "../api/api";

const handleError = environment => function* (f) {
    yield put(electionDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(electionDispatch.errorAdded(ex.message))
    }
}

const convertIsoDatesToWellFormed = electionEdits => {
    const apiFormattedDates = R.pick(['noVotingBefore', 'noVotingAfter'], electionEdits)
    const userFormattedDates = R.map(isoDateToWellFormed, apiFormattedDates)
    const userElectionEdits = R.mergeRight(electionEdits, userFormattedDates)
    return userElectionEdits
}

const convertDatesToInstants = electionEdits => {
    const userFormattedDates = R.pick(['noVotingBefore', 'noVotingAfter'], electionEdits)
    const apiFormattedDates = R.map(userDateToIso, userFormattedDates)
    const apiElectionEdits = R.mergeRight(electionEdits, apiFormattedDates)
    return apiElectionEdits
}

const initialize = environment => function* (event) {
    const query = event.query
    const electionName = query.election
    yield put(electionDispatch.fetchElectionRequest(electionName))
}

const fetchElectionRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {electionName} = event
        const {userName} = yield environment.getLoginInformation()
        const apiElection = yield api.getElection(electionName)
        const election = convertIsoDatesToWellFormed(apiElection)
        yield put(electionDispatch.fetchElectionSuccess({userName, election}))
    })
}

const deleteElectionRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {electionName} = event
        yield api.deleteElection(electionName)
        yield put(navigationDispatch.setUri('/elections'))
    })
}

const launchElectionRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {electionName, allowEdit} = event
        yield api.launchElection({electionName, allowEdit})
        yield put(electionDispatch.fetchElectionRequest(electionName))
    })
}
const finalizeElectionRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {electionName} = event
        yield api.finalizeElection(electionName)
        yield put(electionDispatch.fetchElectionRequest(electionName))
    })
}

const updateElectionRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {updates} = event
        const {
            electionName,
            newElectionName
        } = updates
        const apiUpdates = convertDatesToInstants(event.updates)
        yield api.updateElection(apiUpdates)
        if (newElectionName) {
            yield put(navigationDispatch.setUri(`/election?election=${newElectionName}`))
        } else {
            yield put(electionDispatch.fetchElectionRequest(electionName))
        }
    })
}

const electionEffect = {
    [electionEvent.INITIALIZE]: initialize,
    [electionEvent.FETCH_ELECTION_REQUEST]: fetchElectionRequest,
    [electionEvent.DELETE_ELECTION_REQUEST]: deleteElectionRequest,
    [electionEvent.UPDATE_ELECTION_REQUEST]: updateElectionRequest,
    [electionEvent.LAUNCH_ELECTION_REQUEST]: launchElectionRequest,
    [electionEvent.FINALIZE_ELECTION_REQUEST]: finalizeElectionRequest
}

export default electionEffect
