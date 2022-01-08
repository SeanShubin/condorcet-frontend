import ballotEvent from "./ballotEvent";

const ballotDispatch = {
    fetchBallotRequest: ({voter, election}) => ({
        type: ballotEvent.FETCH_BALLOT_REQUEST,
        voter,
        election
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
    updateRank: ({name, rank}) => ({type: ballotEvent.UPDATE_RANK, name, rank}),
    errorAdded: message => ({type: ballotEvent.ERROR_ADDED, message})
}

export default ballotDispatch
