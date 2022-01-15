import debugTablesDispatch from './debugTablesDispatch'
import debugTablesEvent from './debugTablesEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f){
    yield put(debugTablesDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch(ex) {
        yield put(debugTablesDispatch.errorAdded(ex.message))
    }
}

const fetchTableNamesRequest = environment => function* () {
    const api = createApi(environment)
    yield* handleError(environment)(function*() {
        const tableNames = yield api.listTables()
        yield put(debugTablesDispatch.fetchTableNamesSuccess(tableNames))
    })
}

const fetchTableRequest = environment => function* (event) {
    const api = createApi(environment)
    const {tableName } = event
    yield* handleError(environment)(function*() {
        const tableData = yield api.debugTableData(tableName)
        yield put(debugTablesDispatch.fetchTableSuccess(tableData))
    })
}

const selectedTableChanged = environment => function* (event) {
    const {selectedTableName} = event
    yield* handleError(environment)(function*() {
        yield put(debugTablesDispatch.fetchTableRequest(selectedTableName))
    })
}

const debugTablesEffect = {
    [debugTablesEvent.FETCH_TABLE_NAMES_REQUEST]: fetchTableNamesRequest,
    [debugTablesEvent.FETCH_TABLE_REQUEST]: fetchTableRequest,
    [debugTablesEvent.SELECTED_TABLE_CHANGED]: selectedTableChanged
}

export default debugTablesEffect
