import debugTablesEvent from './debugTablesEvent';
import debugTablesModel from "./debugTablesModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchTableNamesSuccess = (state, event) => R.set(debugTablesModel.names, event.names, state)
const fetchTableSuccess = (state, event) => R.set(debugTablesModel.table, event.table, state)
const selectedTableChanged = (state, event) => R.set(debugTablesModel.selectedName, event.selectedName, state)
const errorAdded = (state, event) => appendToArray(debugTablesModel.errors, event.message, state)

const debugTablesReducer = {
    [debugTablesEvent.FETCH_TABLE_NAMES_SUCCESS]: fetchTableNamesSuccess,
    [debugTablesEvent.FETCH_TABLE_SUCCESS]: fetchTableSuccess,
    [debugTablesEvent.SELECTED_TABLE_CHANGED]: selectedTableChanged,
    [debugTablesEvent.ERROR_ADDED]: errorAdded
}

export default debugTablesReducer
