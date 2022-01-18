import tablesEvent from './tablesEvent';
import tablesModel from "./tablesModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const setTableData = (state, event) => R.pipe(
    R.set(tablesModel.tableNames, event.tableNames),
    R.set(tablesModel.selectedTableName, event.selectedTableName),
    R.set(tablesModel.selectedTableData, event.selectedTableData))(state)

const errorAdded = (state, event) => appendToArray(tablesModel.errors, event.message, state)
const clearErrors = (state, event) => R.set(tablesModel.errors, [], state)

const tablesReducer = {
    [tablesEvent.SET_TABLE_DATA]: setTableData,
    [tablesEvent.ERROR_ADDED]: errorAdded,
    [tablesEvent.CLEAR_ERRORS]: clearErrors
}

export default tablesReducer
