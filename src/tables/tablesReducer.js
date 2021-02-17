import tablesEvent from './tablesEvent';
import tablesModel from "./tablesModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchTableNamesSuccess = (state, event) => R.set(tablesModel.names, event.names, state)
const fetchTableSuccess = (state, event) => R.set(tablesModel.table, event.table, state)
const selectedTableChanged = (state, event) => R.set(tablesModel.selectedName, event.selectedName, state)
const errorAdded = (state, event) => appendToArray(tablesModel.errors, event.message, state)

const tablesReducer = {
    [tablesEvent.FETCH_TABLE_NAMES_SUCCESS]: fetchTableNamesSuccess,
    [tablesEvent.FETCH_TABLE_SUCCESS]: fetchTableSuccess,
    [tablesEvent.SELECTED_TABLE_CHANGED]: selectedTableChanged,
    [tablesEvent.ERROR_ADDED]: errorAdded
}

export default tablesReducer
