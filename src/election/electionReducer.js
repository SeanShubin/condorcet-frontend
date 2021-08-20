import electionEvent from './electionEvent';
import electionModel from "./electionModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchElectionSuccess = (state, event) => R.pipe(
    R.set(electionModel.canUpdate, event.canUpdate),
    R.set(electionModel.originalElection, event.election),
    R.set(electionModel.electionWithEdits, event.election)
)(state)

const updateElectionEdits = (state, event) =>
    R.set(electionModel.electionWithEdits, event.election, state)

const errorAdded = (state, event) => appendToArray(electionModel.errors, event.message, state)

const electionReducer = {
    [electionEvent.FETCH_ELECTION_SUCCESS]: fetchElectionSuccess,
    [electionEvent.UPDATE_ELECTION_EDITS]: updateElectionEdits,
    [electionEvent.ERROR_ADDED]: errorAdded
}

export default electionReducer
