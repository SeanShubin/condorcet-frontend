import tablesDispatch from './tablesDispatch'
import tablesEvent from './tablesEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";
import navigationDispatch from "../navigation/navigationDispatch";

const fetchTableNamesRequest = environment => function* () {
    const result = yield environment.authenticatedFetch(`/proxy/ListTables`)
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(tablesDispatch.fetchTableNamesSuccess(jsonResult.tableNames))
    } else {
        yield put(tablesDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const fetchTableRequest = environment => function* (event) {
    const name = event.name
    const result = yield environment.authenticatedFetch(
        `/proxy/TableData`,
        {
            method: 'POST',
            body: JSON.stringify({name})
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(tablesDispatch.fetchTableSuccess(jsonResult.table))
    } else {
        yield put(tablesDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const selectedTableChanged = environment => function* (event) {
    yield put(tablesDispatch.fetchTableRequest(event.selectedName))
}

const navigate = environment => function* (event) {
    environment.history.push(event.destination)
    yield put(navigationDispatch.fetchPageRequest())
}

const genericError = _ => function* (error, event) {
    yield put(tablesDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const tablesEffect = {
    [tablesEvent.FETCH_TABLE_NAMES_REQUEST]: fetchTableNamesRequest,
    [tablesEvent.FETCH_TABLE_REQUEST]: fetchTableRequest,
    [tablesEvent.SELECTED_TABLE_CHANGED]: selectedTableChanged,
    [tablesEvent.NAVIGATE]: navigate,
    [tablesEvent.GENERIC_ERROR]: genericError
}

export default tablesEffect
