import tallyDispatch from './tallyDispatch'
import tallyEvent from './tallyEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f) {
    yield put(tallyDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(tallyDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event) {
    const query = event.query
    const electionName = query.election
    yield put(tallyDispatch.fetchTallyRequest(electionName))
}

const fetchTallyRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const {electionName} = event
        const tally = yield api.tally(electionName)
        yield put(tallyDispatch.fetchTallySuccess({tally, electionName}))
    })
}

const tallyEffect = {
    [tallyEvent.INITIALIZE]: initialize,
    [tallyEvent.FETCH_TALLY_REQUEST]: fetchTallyRequest
}

export default tallyEffect
