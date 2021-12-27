import candidatesDispatch from './candidatesDispatch'
import candidatesEvent from './candidatesEvent'
import {put} from 'redux-saga/effects'

const fetchCandidatesRequest = environment => function* (event) {
    yield put(candidatesDispatch.clearErrors())
    const electionName = event.electionName
    yield put(candidatesDispatch.setElectionName(electionName))
    const body = {electionName}
    const result = yield environment.authenticatedFetch(
        `/proxy/ListCandidates`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(candidatesDispatch.fetchCandidatesSuccess(jsonResult.candidates))
    } else {
        yield put(candidatesDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const setCandidatesRequest = environment => function* (event) {
    yield put(candidatesDispatch.clearErrors())
    const electionName = event.election
    const candidateNames = event.candidates
    const body = {electionName, candidateNames}
    const result = yield environment.authenticatedFetch(
        `/proxy/SetCandidates`,
        {
            method: 'POST',
            body: JSON.stringify(body)
        })
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(candidatesDispatch.fetchCandidatesRequest(electionName))
    } else {
        yield put(candidatesDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const candidatesEffect = {
    [candidatesEvent.FETCH_CANDIDATES_REQUEST]: fetchCandidatesRequest,
    [candidatesEvent.SET_CANDIDATES_REQUEST]: setCandidatesRequest,
}

export default candidatesEffect
