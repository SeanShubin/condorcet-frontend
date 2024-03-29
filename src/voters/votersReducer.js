import votersEvent from './votersEvent';
import votersModel from "./votersModel";
import * as R from 'ramda';
import {appendToArray} from "../library/collection-util";

const fetchVotersSuccess = (state, event) => R.pipe(
    R.set(votersModel.userName, event.userName),
    R.set(votersModel.election, event.election),
    R.set(votersModel.originalVoters, event.voters),
    R.set(votersModel.votersWithEdits, event.voters)
)(state)
const updateVoterEdits = (state, event) => R.set(votersModel.votersWithEdits, event.voters, state)
const updateFilter = (state, event) => R.set(votersModel.filter, event.filter, state)
const errorAdded = (state, event) => appendToArray(votersModel.errors, event.message, state)
const errorsCleared = (state, event) => R.set(votersModel.errors, [], state)

const votersReducer = {
    [votersEvent.FETCH_VOTERS_SUCCESS]: fetchVotersSuccess,
    [votersEvent.UPDATE_VOTER_EDITS]: updateVoterEdits,
    [votersEvent.FILTER_CHANGED]: updateFilter,
    [votersEvent.ERROR_ADDED]: errorAdded,
    [votersEvent.CLEAR_ERRORS]: errorsCleared
}

export default votersReducer

