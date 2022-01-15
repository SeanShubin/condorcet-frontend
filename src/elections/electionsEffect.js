import electionsDispatch from './electionsDispatch'
import electionsEvent from './electionsEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f){
    yield put(electionsDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch(ex) {
        yield put(electionsDispatch.errorAdded(ex.message))
    }
}

const fetchElectionsRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function*() {
        const elections = yield api.listElections()
        yield put(electionsDispatch.fetchElectionsSuccess(elections))
    })
}

const addElectionRequest = environment => function* (event) {
    const api = createApi(environment)
    const {electionName} = event
    yield* handleError(environment)(function*() {
        yield api.addElection({electionName})
        yield put(electionsDispatch.electionNameChanged(''))
        yield put(electionsDispatch.fetchElectionsRequest())
    })
}

const electionsEffect = {
    [electionsEvent.FETCH_ELECTIONS_REQUEST]: fetchElectionsRequest,
    [electionsEvent.ADD_ELECTION_REQUEST]: addElectionRequest
}

export default electionsEffect
