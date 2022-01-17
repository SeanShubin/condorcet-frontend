import electionEvent from "./electionEvent";

const electionDispatch = {
    initialize: query => ({type: electionEvent.INITIALIZE, query}),
    fetchElectionRequest: electionName => ({type: electionEvent.FETCH_ELECTION_REQUEST, electionName}),
    fetchElectionSuccess: ({userName, election}) => ({
        type: electionEvent.FETCH_ELECTION_SUCCESS,
        election,
        userName
    }),
    deleteElectionRequest: electionName => ({type: electionEvent.DELETE_ELECTION_REQUEST, electionName}),
    updateElectionRequest: updates => ({type: electionEvent.UPDATE_ELECTION_REQUEST, updates}),
    updateElectionEdits: election => ({type: electionEvent.UPDATE_ELECTION_EDITS, election}),
    launchElectionRequest: ({electionName, allowEdit}) => ({type: electionEvent.LAUNCH_ELECTION_REQUEST, electionName, allowEdit}),
    finalizeElectionRequest: electionName => ({type: electionEvent.FINALIZE_ELECTION_REQUEST, electionName}),
    errorAdded: message => ({type: electionEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type:electionEvent.CLEAR_ERRORS})
}

export default electionDispatch
