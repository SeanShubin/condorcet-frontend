import tablesDispatch from './tablesDispatch'
import tablesEvent from './tablesEvent'
import {put} from 'redux-saga/effects'
import {createApi} from "../api/api";
import navigationDispatch from "../navigation/navigationDispatch";
import {createTablesPagePath} from "./tablesConstant";

const handleError = environment => function* (f) {
    yield put(tablesDispatch.clearErrors())
    try {
        yield* f(environment)
    } catch (ex) {
        yield put(tablesDispatch.errorAdded(ex.message))
    }
}

const initialize = environment => function* (event) {
    const api = createApi(environment)
    yield* handleError(environment)(function* () {
        const query = event.query
        const selectedTableName = query.table
        if (query.table) {
            const tableNames = yield api.listTables()
            const selectedTableData = yield api.tableData(selectedTableName)
            yield put(tablesDispatch.setTableData({tableNames, selectedTableName, selectedTableData}))
        } else {
            yield put(navigationDispatch.setUri(createTablesPagePath('user')))
        }
    })
}

const tablesEffect = {
    [tablesEvent.INITIALIZE]: initialize
}

export default tablesEffect
