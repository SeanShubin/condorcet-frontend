import debugTablesDispatch from './debugTablesDispatch'
import debugTablesEvent from './debugTablesEvent'
import {put} from 'redux-saga/effects'
import {composeErrorEventMessage} from "../library/error-util";

const fetchTableNamesRequest = environment => function* () {
    const result = yield environment.authenticatedFetch(`/proxy/ListTables`)
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(debugTablesDispatch.fetchTableNamesSuccess(jsonResult.tableNames))
    } else {
        yield put(debugTablesDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const fetchTableRequest = environment => function* (event) {
    const name = event.name
    const result = yield environment.authenticatedFetch(
        `/proxy/DebugTableData`,
        {
            method: 'POST',
            body: JSON.stringify({name})
        }
    )
    const jsonResult = yield result.json()
    if (result.ok) {
        yield put(debugTablesDispatch.fetchTableSuccess(jsonResult.table))
    } else {
        yield put(debugTablesDispatch.errorAdded(jsonResult.userSafeMessage))
    }
}

const selectedTableChanged = environment => function* (event) {
    yield put(debugTablesDispatch.fetchTableRequest(event.selectedName))
}

const genericError = _ => function* (error, event) {
    yield put(debugTablesDispatch.errorAdded(composeErrorEventMessage({error, event})))
}

const debugTablesEffect = {
    [debugTablesEvent.FETCH_TABLE_NAMES_REQUEST]: fetchTableNamesRequest,
    [debugTablesEvent.FETCH_TABLE_REQUEST]: fetchTableRequest,
    [debugTablesEvent.SELECTED_TABLE_CHANGED]: selectedTableChanged,
    [debugTablesEvent.GENERIC_ERROR]: genericError
}

export default debugTablesEffect
