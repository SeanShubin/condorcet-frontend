import ballotEvent from "./ballotEvent";

const ballotDispatch = {
    initialize: ({query, loginInformation}) => ({type:ballotEvent.INITIALIZE, query, loginInformation}),
    fetchBallotRequest: ({voterName, electionName}) => ({
        type: ballotEvent.FETCH_BALLOT_REQUEST,
        voterName,
        electionName
    }),
    fetchBallotSuccess: ({voterName, electionName, ballot, rankings}) => ({
        type: ballotEvent.FETCH_BALLOT_SUCCESS,
        voterName,
        electionName,
        ballot,
        rankings
    }),
    castBallotRequest: ({voterName, electionName, rankings}) => ({
        type: ballotEvent.CAST_BALLOT_REQUEST,
        voterName,
        electionName,
        rankings
    }),
    selectCandidate: ({candidateName, rank}) => ({type: ballotEvent.SELECT_CANDIDATE, candidateName, rank}),
    clearBallot: () => ({type: ballotEvent.CLEAR_BALLOT}),
    errorAdded: message => ({type: ballotEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type: ballotEvent.CLEAR_ERRORS})
}

export default ballotDispatch
