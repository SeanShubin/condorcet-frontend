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
    updateRank: ({name, rank}) => ({type: ballotEvent.UPDATE_RANK, name, rank}),
    navigateDashboard: () => ({type: ballotEvent.NAVIGATE_DASHBOARD}),
    navigateElection: election => ({type: ballotEvent.NAVIGATE_ELECTION, election}),
    errorAdded: message => ({type: ballotEvent.ERROR_ADDED, message})
}

export default ballotDispatch
