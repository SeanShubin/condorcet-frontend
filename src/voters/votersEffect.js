import votersDispatch from './votersDispatch'
import votersEvent from './votersEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f) {
    yield put(votersDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(votersDispatch.errorAdded(ex.message))
    }
}

const fetchVotersRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {userName} = yield environment.getLoginInformation()
        const {electionName} = event
        const election = yield api.getElection(electionName)
        const voters = yield api.listEligibility(electionName)
        yield put(votersDispatch.fetchVotersSuccess({voters, userName, election}))
    })
}

const setVotersRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {electionName, userNames} = event
        yield api.setEligibleVoters({electionName, userNames})
        yield put(votersDispatch.fetchVotersRequest(electionName))
    })
}

const votersEffect = {
    [votersEvent.FETCH_VOTERS_REQUEST]: fetchVotersRequest,
    [votersEvent.SET_VOTERS_REQUEST]: setVotersRequest,
}

export default votersEffect
