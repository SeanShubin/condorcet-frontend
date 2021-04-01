import eventsDispatch from './eventsDispatch'
import eventsEvent from './eventsEvent'
import {put} from 'redux-saga/effects'

const fetchTableRequest = environment => function* (event) {
    const result = yield environment.authenticatedFetch(
        `/proxy/EventData`,
        {
            method: 'POST',
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(eventsDispatch.fetchTableSuccess(jsonResult.events))
    } else {
        yield put(eventsDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const eventsEffect = {
    [eventsEvent.FETCH_TABLE_REQUEST]: fetchTableRequest
}

export default eventsEffect
