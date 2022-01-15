import electionsEvent from './electionsEvent';
import electionsModel from "./electionsModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchElectionsSuccess = (state, event) => R.set(electionsModel.elections, event.elections, state)
const electionNameChanged = (state, event) => R.set(electionsModel.electionName, event.electionName, state)
const errorAdded = (state, event) => appendToArray(electionsModel.errors, event.message, state)
const clearErrors = (state, event) => R.set(electionsModel.errors, [], state)

const electionsReducer = {
    [electionsEvent.FETCH_ELECTIONS_SUCCESS]: fetchElectionsSuccess,
    [electionsEvent.ELECTION_NAME_CHANGED]: electionNameChanged,
    [electionsEvent.ERROR_ADDED]: errorAdded,
    [electionsEvent.CLEAR_ERRORS]:clearErrors
}

export default electionsReducer
