import ballotEvent from './ballotEvent';
import ballotModel from "./ballotModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const fetchBallotSuccess = (state, event) => R.pipe(
    R.set(ballotModel.voter, event.voterName),
    R.set(ballotModel.election, event.electionName),
    R.set(ballotModel.originalRankings, event.rankings),
    R.set(ballotModel.editedRankings, event.rankings)
)(state)

const updateRank = (state, event) => {
    const targetCandidateName = event.name
    const newRank = event.rank
    const updateRank = ({candidateName, rank}) => {
        if (candidateName === targetCandidateName) {
            return {candidateName, rank: newRank}
        } else {
            return {candidateName, rank}
        }
    }
    const oldRankings = R.view(ballotModel.editedRankings, state)
    const newRankings = R.map(updateRank, oldRankings)
    const newState = R.set(ballotModel.editedRankings, newRankings, state)
    return newState
}

const errorAdded = (state, event) => appendToArray(ballotModel.errors, event.message, state)

const ballotReducer = {
    [ballotEvent.FETCH_BALLOT_SUCCESS]: fetchBallotSuccess,
    [ballotEvent.UPDATE_RANK]: updateRank,
    [ballotEvent.ERROR_ADDED]: errorAdded
}

export default ballotReducer