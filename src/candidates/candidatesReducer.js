import candidatesEvent from './candidatesEvent';
import candidatesModel from "./candidatesModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const fetchCandidatesSuccess = (state, event) => R.pipe(
    R.set(candidatesModel.originalCandidates, event.candidates),
    R.set(candidatesModel.candidatesWithEdits, event.candidates)
)(state)
const updateCandidateEdits = (state, event) => R.set(candidatesModel.candidatesWithEdits, event.candidates, state)
const setElectionName = (state, event) => R.set(candidatesModel.electionName, event.electionName, state)
const errorAdded = (state, event) => appendToArray(candidatesModel.errors, event.message, state)
const errorsCleared = (state, event) => R.set(candidatesModel.errors, [], state)

const candidatesReducer = {
    [candidatesEvent.FETCH_CANDIDATES_SUCCESS]: fetchCandidatesSuccess,
    [candidatesEvent.UPDATE_CANDIDATE_EDITS]: updateCandidateEdits,
    [candidatesEvent.SET_ELECTION_NAME]: setElectionName,
    [candidatesEvent.ERROR_ADDED]: errorAdded,
    [candidatesEvent.CLEAR_ERRORS]: errorsCleared
}

export default candidatesReducer
