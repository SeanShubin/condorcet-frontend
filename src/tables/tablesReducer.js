import tablesEvent from './tablesEvent';
import tablesModel from "./tablesModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchTableNamesSuccess = (state, event) => R.set(tablesModel.tableNames, event.tableNames, state)
const fetchTableSuccess = (state, event) => R.set(tablesModel.tableData, event.tableData, state)
const selectedTableChanged = (state, event) => R.set(tablesModel.selectedTableName, event.selectedTableName, state)
const errorAdded = (state, event) => appendToArray(tablesModel.errors, event.message, state)
const clearErrors = (state, event) => R.set(tablesModel.errors, [], state)

const tablesReducer = {
    [tablesEvent.FETCH_TABLE_NAMES_SUCCESS]: fetchTableNamesSuccess,
    [tablesEvent.FETCH_TABLE_SUCCESS]: fetchTableSuccess,
    [tablesEvent.SELECTED_TABLE_CHANGED]: selectedTableChanged,
    [tablesEvent.ERROR_ADDED]: errorAdded,
    [tablesEvent.CLEAR_ERRORS]: clearErrors
}

export default tablesReducer
