import eventsDispatch from './eventsDispatch'
import eventsEvent from './eventsEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";

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

const genericError = _ => function* (error, event) {
    yield put(eventsDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const eventsEffect = {
    [eventsEvent.FETCH_TABLE_REQUEST]: fetchTableRequest,
    [eventsEvent.GENERIC_ERROR]: genericError
}

export default eventsEffect
