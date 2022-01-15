import tablesDispatch from './tablesDispatch'
import tablesEvent from './tablesEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";

const handleError = environment => function* (f){
    yield put(tablesDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch(ex) {
        yield put(tablesDispatch.errorAdded(ex.message))
    }
}

const fetchTableNamesRequest = environment => function* () {
    const api = createApi(environment)
    yield* handleError(environment)(function*() {
        const tableNames = yield api.listTables()
        yield put(tablesDispatch.fetchTableNamesSuccess(tableNames))
    })
}

const fetchTableRequest = environment => function* (event) {
    const api = createApi(environment)
    const {tableName } = event
    yield* handleError(environment)(function*() {
        const tableData = yield api.tableData(tableName)
        yield put(tablesDispatch.fetchTableSuccess(tableData))
    })
}

const selectedTableChanged = environment => function* (event) {
    const {selectedTableName} = event
    yield* handleError(environment)(function*() {
        yield put(tablesDispatch.fetchTableRequest(selectedTableName))
    })
}

const tablesEffect = {
    [tablesEvent.FETCH_TABLE_NAMES_REQUEST]: fetchTableNamesRequest,
    [tablesEvent.FETCH_TABLE_REQUEST]: fetchTableRequest,
    [tablesEvent.SELECTED_TABLE_CHANGED]: selectedTableChanged
}

export default tablesEffect
