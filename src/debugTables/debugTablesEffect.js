import debugTablesDispatch from './debugTablesDispatch'
import debugTablesEvent from './debugTablesEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";
import navigationDispatch from "../navigation/navigationDispatch";
import {createDebugTablesPagePath} from "./debugTablesConstant";

const handleError = environment => function* (f) {
    yield put(debugTablesDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(debugTablesDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const query = event.query
        const selectedTableName = query.table
        if (selectedTableName) {
            const tableNames = yield api.listTables()
            const selectedTableData = yield api.debugTableData(selectedTableName)
            yield put(debugTablesDispatch.setTableData({tableNames, selectedTableName, selectedTableData}))
        } else {
            yield put(navigationDispatch.setUri(createDebugTablesPagePath('user')))
        }
    })
}

const debugTablesEffect = {
    [debugTablesEvent.INITIALIZE]: initialize
}

export default debugTablesEffect
