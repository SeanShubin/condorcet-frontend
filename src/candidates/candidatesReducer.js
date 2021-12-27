import candidatesEvent from './candidatesEvent';
import candidatesModel from "./candidatesModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const changeCandidates = (state, event) => R.set(candidatesModel.candidates, event.candidates, state)
const setElectionName = (state, event) => R.set(candidatesModel.electionName, event.electionName, state)
const errorAdded = (state, event) => appendToArray(candidatesModel.errors, event.message, state)
const errorsCleared = (state, event) => R.set(candidatesModel.errors, [], state)

const candidatesReducer = {
    [candidatesEvent.CHANGE_CANDIDATES]: changeCandidates,
    [candidatesEvent.SET_ELECTION_NAME]: setElectionName,
    [candidatesEvent.ERROR_ADDED]: errorAdded,
    [candidatesEvent.CLEAR_ERRORS]: errorsCleared
}

export default candidatesReducer
