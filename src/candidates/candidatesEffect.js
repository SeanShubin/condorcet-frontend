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
        yield put(candidatesDispatch.changeCandidates(jsonResult.candidates))
    } else {
        yield put(candidatesDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const updateCandidatesRequest = environment => function* (event) {
    yield put(candidatesDispatch.clearErrors())
    const electionName = event.electionName
    const candidateNames = event.candidateNames
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
    [candidatesEvent.UPDATE_CANDIDATES_REQUEST]: updateCandidatesRequest,
}

export default candidatesEffect
