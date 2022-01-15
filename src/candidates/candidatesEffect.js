import candidatesDispatch from './candidatesDispatch'
import candidatesEvent from './candidatesEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f) {
    yield put(candidatesDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(candidatesDispatch.errorAdded(ex.message))
    }
}

const fetchCandidatesRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {electionName} = event
        const candidateNames = yield api.listCandidates(electionName)
        yield put(candidatesDispatch.fetchCandidatesSuccess({electionName, candidateNames}))
    })
}

const setCandidatesRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {electionName,candidateNames} = event
        yield api.setCandidates({electionName, candidateNames})
        yield put(candidatesDispatch.fetchCandidatesRequest(electionName))
    })
}

const candidatesEffect = {
    [candidatesEvent.FETCH_CANDIDATES_REQUEST]: fetchCandidatesRequest,
    [candidatesEvent.SET_CANDIDATES_REQUEST]: setCandidatesRequest,
}

export default candidatesEffect
