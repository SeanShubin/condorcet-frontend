import ballotEvent from './ballotEvent';
import ballotModel from "./ballotModel";
import {appendToArray} from "../library/collection-util";
import * as R from 'ramda'

const clearBallot = (state, event) => {
    const originalRankings = R.view(ballotModel.originalRankings, state)
    const setRankToNull = ({candidateName, rank}) => ({candidateName, rank:null})
    const newRankings = R.map(setRankToNull, originalRankings)
    return R.set(ballotModel.editedRankings, newRankings, state)
}

const fetchBallotSuccess = (state, event) => R.pipe(
    R.set(ballotModel.voterName, event.voterName),
    R.set(ballotModel.electionName, event.electionName),
    R.set(ballotModel.ballot, event.ballot),
    R.set(ballotModel.originalRankings, event.rankings),
    R.set(ballotModel.editedRankings, event.rankings)
)(state)

const nextRank = rankings => {
    return R.reduce(R.max, 0, R.map(R.prop('rank'), rankings)) + 1
}

const addAfterLastRanked = ({rankings, candidateName}) => {
    const targetCandidateName = candidateName
    const targetCandidateRank = nextRank(rankings)
    const updateCandidate = ({candidateName, rank}) => {
        if(candidateName === targetCandidateName){
            return {candidateName, rank:targetCandidateRank}
        } else {
            return {candidateName, rank}
        }
    }
    const newRankings = R.map(updateCandidate, rankings)
    return newRankings
}

const moveRankGreaterNumber = ({rankings, moveFromRank, moveToRank}) => {
    const setRank = ({candidateName, rank}) => {
        if(!rank || rank < moveFromRank || rank > moveToRank) return {candidateName, rank}
        if(rank === moveFromRank) return {candidateName, rank:moveToRank}
        else return {candidateName, rank:rank-1}
    }
    return rankings.map(setRank)
}

const moveRankLowerNumber = ({rankings, moveFromRank, moveToRank}) => {
    const setRank = ({candidateName, rank}) => {
        if(!rank || rank < moveToRank || rank > moveFromRank) return {candidateName, rank}
        if(rank === moveFromRank) return {candidateName, rank:moveToRank}
        else return {candidateName, rank:rank+1}
    }
    return rankings.map(setRank)
}

const moveCandidate = ({rankings, moveFromRank, moveToRank}) => {
    if(moveFromRank < moveToRank) return moveRankGreaterNumber({rankings, moveFromRank, moveToRank})
    if(moveFromRank > moveToRank) return moveRankLowerNumber({rankings, moveFromRank, moveToRank})
    return rankings
}

const sortRankings = rankings => {
    const [nullRankings, nonNullRankings] = R.partition(R.compose(R.isNil, R.prop('rank')), rankings)
    const sortedRankings = R.sortBy(R.prop('rank'), nonNullRankings)
    const newRankings = R.concat(sortedRankings, nullRankings)
    return newRankings
}

const selectCandidate = (state, event) => {
    const {candidateName, rank} = event
    const rankings = R.view(ballotModel.editedRankings, state)
    const moveFromRank = R.view(ballotModel.moveFromRank, state)
    if(R.isNil(rank)) {
        const newRankings = addAfterLastRanked({rankings, candidateName})
        const sortedRankings = sortRankings(newRankings)
        return R.set(ballotModel.editedRankings, sortedRankings, state)
    } else if(R.isNil(moveFromRank)) {
        return R.set(ballotModel.moveFromRank, rank, state)
    } else {
        const moveToRank = rank
        const newRankings = moveCandidate({rankings, moveFromRank, moveToRank})
        const sortedRankings = sortRankings(newRankings)
        return R.pipe(
            R.set(ballotModel.editedRankings, sortedRankings),
            R.set(ballotModel.moveFromRank, null))(state)
    }
}

const errorAdded = (state, event) => appendToArray(ballotModel.errors, event.message, state)

const clearErrors = (state, event) => R.set(ballotModel.errors, [], state)

const ballotReducer = {
    [ballotEvent.FETCH_BALLOT_SUCCESS]: fetchBallotSuccess,
    [ballotEvent.SELECT_CANDIDATE]: selectCandidate,
    [ballotEvent.CLEAR_BALLOT]: clearBallot,
    [ballotEvent.ERROR_ADDED]: errorAdded,
    [ballotEvent.CLEAR_ERRORS]:clearErrors
}

export default ballotReducer
