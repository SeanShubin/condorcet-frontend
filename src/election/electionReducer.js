import electionEvent from './electionEvent';
import electionModel from "./electionModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchElectionSuccess = (state, event) =>
    R.set(electionModel.election, event.election, state)

const errorAdded = (state, event) => appendToArray(electionModel.errors, event.message, state)

const electionReducer = {
    [electionEvent.FETCH_ELECTION_SUCCESS]: fetchElectionSuccess,
    [electionEvent.ERROR_ADDED]: errorAdded
}

export default electionReducer
