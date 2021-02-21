import eventsDispatch from './eventsDispatch'
import eventsEvent from './eventsEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";
import navigationDispatch from "../navigation/navigationDispatch";

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

const navigate = environment => function* (event) {
    environment.history.push(event.destination)
    yield put(navigationDispatch.fetchPageRequest())
}

const genericError = _ => function* (error, event) {
    yield put(eventsDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const eventsEffect = {
    [eventsEvent.FETCH_TABLE_REQUEST]: fetchTableRequest,
    [eventsEvent.NAVIGATE]: navigate,
    [eventsEvent.GENERIC_ERROR]: genericError
}

export default eventsEffect
