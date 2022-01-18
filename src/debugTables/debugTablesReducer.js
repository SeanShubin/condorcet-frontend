import debugTablesEvent from './debugTablesEvent';
import debugTablesModel from "./debugTablesModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const setTableData = (state, event) => R.pipe(
    R.set(debugTablesModel.tableNames, event.tableNames),
    R.set(debugTablesModel.selectedTableName, event.selectedTableName),
    R.set(debugTablesModel.selectedTableData, event.selectedTableData))(state)
const errorAdded = (state, event) => appendToArray(debugTablesModel.errors, event.message, state)
const clearErrors = (state, event) => R.set(debugTablesModel.errors, [], state)

const debugTablesReducer = {
    [debugTablesEvent.SET_TABLE_DATA]: setTableData,
    [debugTablesEvent.ERROR_ADDED]: errorAdded,
    [debugTablesEvent.CLEAR_ERRORS]: clearErrors
}

export default debugTablesReducer
