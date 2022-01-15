import debugTablesEvent from './debugTablesEvent';
import debugTablesModel from "./debugTablesModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchTableNamesSuccess = (state, event) => R.set(debugTablesModel.tableNames, event.tableNames, state)
const fetchTableSuccess = (state, event) => R.set(debugTablesModel.tableData, event.tableData, state)
const selectedTableChanged = (state, event) => R.set(debugTablesModel.selectedTableName, event.selectedTableName, state)
const errorAdded = (state, event) => appendToArray(debugTablesModel.errors, event.message, state)
const clearErrors = (state, event) => R.set(debugTablesModel.errors, [], state)

const debugTablesReducer = {
    [debugTablesEvent.FETCH_TABLE_NAMES_SUCCESS]: fetchTableNamesSuccess,
    [debugTablesEvent.FETCH_TABLE_SUCCESS]: fetchTableSuccess,
    [debugTablesEvent.SELECTED_TABLE_CHANGED]: selectedTableChanged,
    [debugTablesEvent.ERROR_ADDED]: errorAdded,
    [debugTablesEvent.CLEAR_ERRORS]: clearErrors
}

export default debugTablesReducer
