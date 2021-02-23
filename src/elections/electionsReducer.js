import electionsEvent from './electionsEvent';
import electionsModel from "./electionsModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchElectionsSuccess = (state, event) => R.set(electionsModel.elections, event.elections, state)
const electionNameChanged = (state, event) => R.set(electionsModel.electionName, event.name, state)
const errorAdded = (state, event) => appendToArray(electionsModel.errors, event.message, state)

const electionsReducer = {
    [electionsEvent.FETCH_ELECTIONS_SUCCESS]: fetchElectionsSuccess,
    [electionsEvent.ELECTION_NAME_CHANGED]: electionNameChanged,
    [electionsEvent.ERROR_ADDED]: errorAdded
}

export default electionsReducer
