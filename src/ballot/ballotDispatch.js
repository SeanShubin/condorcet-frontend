import ballotEvent from "./ballotEvent";

const ballotDispatch = {
    fetchBallotRequest: ({voterName, electionName}) => ({
        type: ballotEvent.FETCH_BALLOT_REQUEST,
        voterName,
        electionName
    }),
    fetchBallotSuccess: ({voterName, electionName, rankings}) => ({
        type: ballotEvent.FETCH_BALLOT_SUCCESS,
        voterName,
        electionName,
        rankings
    }),
    castBallotRequest: ({voterName, electionName, rankings}) => ({
        type: ballotEvent.CAST_BALLOT_REQUEST,
        voterName,
        electionName,
        rankings
    }),
    updateRank: ({candidateName, rank}) => ({type: ballotEvent.UPDATE_RANK, candidateName, rank}),
    errorAdded: message => ({type: ballotEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: ballotEvent.CLEAR_ERRORS})
}

export default ballotDispatch
