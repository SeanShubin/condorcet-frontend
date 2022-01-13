import votersEvent from './votersEvent';
import votersModel from "./votersModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const fetchVotersSuccess = (state, event) => R.pipe(
    R.set(votersModel.originalVoters, event.voters),
    R.set(votersModel.votersWithEdits, event.voters)
)(state)
const updateVoterEdits = (state, event) => R.set(votersModel.votersWithEdits, event.voters, state)
const setElectionName = (state, event) => R.set(votersModel.electionName, event.electionName, state)
const errorAdded = (state, event) => appendToArray(votersModel.errors, event.message, state)
const errorsCleared = (state, event) => R.set(votersModel.errors, [], state)

const votersReducer = {
    [votersEvent.SET_ELECTION_NAME]: setElectionName,
    [votersEvent.FETCH_VOTERS_SUCCESS]: fetchVotersSuccess,
    [votersEvent.UPDATE_VOTER_EDITS]: updateVoterEdits,
    [votersEvent.ERROR_ADDED]: errorAdded,
    [votersEvent.CLEAR_ERRORS]: errorsCleared
}

export default votersReducer

