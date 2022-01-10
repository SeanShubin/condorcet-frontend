import electionEvent from "./electionEvent";

const electionDispatch = {
    fetchElectionRequest: name => ({type: electionEvent.FETCH_ELECTION_REQUEST, name}),
    fetchElectionSuccess: ({user, election}) => ({
        type: electionEvent.FETCH_ELECTION_SUCCESS,
        election,
        user
    }),
    deleteElectionRequest: name => ({type: electionEvent.DELETE_ELECTION_REQUEST, name}),
    updateElectionRequest: updates => ({type: electionEvent.UPDATE_ELECTION_REQUEST, updates}),
    updateElectionEdits: election => ({type: electionEvent.UPDATE_ELECTION_EDITS, election}),
    launchElectionRequest: ({election, allowEdits}) => ({type: electionEvent.LAUNCH_ELECTION_REQUEST, election, allowEdits}),
    finalizeElectionRequest: election => ({type: electionEvent.FINALIZE_ELECTION_REQUEST, election}),
    errorAdded: message => ({type: electionEvent.ERROR_ADDED, message}),
    clearErrors: () => ({type:electionEvent.CLEAR_ERRORS})
}

export default electionDispatch
