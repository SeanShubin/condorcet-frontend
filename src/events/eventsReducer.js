import eventsEvent from './eventsEvent';
import eventsModel from "./eventsModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchTableSuccess = (state, event) => R.set(eventsModel.table, event.table, state)
const errorAdded = (state, event) => appendToArray(eventsModel.errors, event.message, state)

const eventsReducer = {
    [eventsEvent.FETCH_TABLE_SUCCESS]: fetchTableSuccess,
    [eventsEvent.ERROR_ADDED]: errorAdded
}

export default eventsReducer
