import eventsDispatch from './eventsDispatch'
import eventsEvent from './eventsEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f) {
    yield put(eventsDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(eventsDispatch.errorAdded(ex.message))
    }
}

const fetchTableRequest = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const eventData = yield api.eventData()
        yield put(eventsDispatch.fetchTableSuccess(eventData))
    })
}

const eventsEffect = {
    [eventsEvent.FETCH_TABLE_REQUEST]: fetchTableRequest
}

export default eventsEffect
